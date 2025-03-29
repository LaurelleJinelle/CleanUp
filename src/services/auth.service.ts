import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    User
  } from "firebase/auth";
  import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
  import { auth, db } from "../firebase-config";
  
  // Register a new user
  export const registerUser = async (
    name: string, 
    email: string, 
    password: string, 
    role: string 
  ): Promise<User> => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update profile with name
      await updateProfile(user, { displayName: name });
  
      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
  
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  
  // Login with email and password
  export const loginWithEmail = async (
    email: string, 
    password: string
  ): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };
  
  // Login with Google
  export const loginWithGoogle = async (): Promise<User> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
  
      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", user.uid));
  
      // If not, create it
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "resident", // Default role for Google sign-ins
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
  
      return user;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  };
  
  // Logout user
  export const logoutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };
  
  // Get current user with additional data from Firestore
  export const getCurrentUser = (): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        if (user) {
          // Get user role from Firestore
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              resolve({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: userData.role,
              });
            } else {
              resolve(user);
            }
          } catch (error) {
            console.error("Error getting user data:", error);
            resolve(user);
          }
        } else {
          resolve(null);
        }
      }, reject);
    });
  };