import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { app } from "../Firebase/firebase.init";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= SIGN UP =================
  const signupUser = async (email, password, name, photo, address) => {
    setLoading(true);

    // 1️⃣ Firebase signup
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // 2️⃣ Update Firebase profile
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photo,
    });

    // 3️⃣ Backend login (UPSERT + JWT COOKIE)
    await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        name,
        image: photo,
        address,
      }),
    });

    setUser({
      ...result.user,
      role: "user",
      address,
    });

    setLoading(false);
    return result;
  };

  // ================= LOGIN =================
  const loginUser = async (email, password) => {
    setLoading(true);

    // 1️⃣ Firebase login
    const result = await signInWithEmailAndPassword(auth, email, password);

    // 2️⃣ Backend login (JWT cookie issue)
    await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: result.user.email,
        name: result.user.displayName,
        image: result.user.photoURL,
        address: "",
      }),
    });

    setLoading(false);
    return result;
  };

  // ================= GOOGLE LOGIN =================
  const googleLogin = async () => {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);

    await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: result.user.email,
        name: result.user.displayName,
        image: result.user.photoURL,
        address: "",
      }),
    });

    setUser(result.user);
    setLoading(false);
    return result;
  };

  // ================= LOGOUT =================
  const logOut = async () => {
    setLoading(true);

    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // ================= AUTH STATE =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await fetch("http://localhost:3000/api/auth/me", {
            credentials: "include",
          });

          const backendUser = await res.json();

          setUser({
            ...currentUser,
            role: backendUser.role,
            address: backendUser.address,
            status: backendUser.status,
            chefId: backendUser.chefId,
          });
        } catch (err) {
          console.error("Backend sync failed:", err);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    signupUser,
    loginUser,
    googleLogin,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
