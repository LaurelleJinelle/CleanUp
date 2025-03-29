import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { registerUser, loginWithEmail, loginWithGoogle, logoutUser, getCurrentUser } from "../services/auth.service";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string, role?: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Auth state error:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const register = async (name: string, email: string, password: string, role = "resident"): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const user = await registerUser(name, email, password, role);
      setCurrentUser(user as User);
      return user as User;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const user = await loginWithEmail(email, password);
      const userWithRole = await getCurrentUser();
      setCurrentUser(userWithRole);
      return userWithRole;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogleAuth = async (): Promise<User> => {
    try {
      setError(null);
      setLoading(true);
      const user = await loginWithGoogle();
      const userWithRole = await getCurrentUser();
      setCurrentUser(userWithRole);
      return userWithRole;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await logoutUser();
      setCurrentUser(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      throw error;
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    register,
    login,
    loginWithGoogle: loginWithGoogleAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};