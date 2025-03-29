import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RecycleIcon} from "lucide-react";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      // Step 1: Authenticate user
      const user= await login(email, password);
  
      if (!user || !user.uid) {
        throw new Error("Invalid user credentials.");
      }
  
      // Step 2: Fetch user role from Firestore (matching how Register stores it)
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }
  
      const userData = userDoc.data();
      if (!userData || !userData.role) {
        throw new Error("User role is missing. Please contact support.");
      }
  
      const userRole = userData.role as string;
  
      // Step 3: Navigate Based on Role (assuming role names match register)
      onLogin(user)
      navigate(`/${userRole.toLowerCase()}`);
  
      toast.success("Login successful!");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      // Step 1: Authenticate user
      const user= await loginWithGoogle();
  
      if (!user || !user.uid) {
        throw new Error("Invalid user credentials.");
      }
  
      // Step 2: Fetch user role from Firestore (matching how Register stores it)
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }
  
      const userData = userDoc.data();
      if (!userData || !userData.role) {
        throw new Error("User role is missing. Please contact support.");
      }
  
      const userRole = userData.role as string;
  
      // Step 3: Navigate Based on Role (assuming role names match register)
      onLogin(user)
      navigate(`/${userRole.toLowerCase()}`);
  
      toast.success("Login successful!");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <div className="text-center mb-6">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <RecycleIcon className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-600">CleanUp</h1>
          </Link>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.198-2.707-6.735-2.707-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.326 10-12.234 0-0.598-0.066-1.170-0.162-1.734h-9.838z"
                    fill="#4285F4"
                  />
                </svg>
                Sign in with Google
              </span>
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;