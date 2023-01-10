import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState } from "react";
import { auth } from "../firebase";
import { signIn, signOut, createAccount } from "./helpers";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authError, setAuthError] = useState();
    const [user, setUser] = useState(auth.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(auth.currentUser));

    const signInHandler = async (email, password) => await signIn(setUser, setIsLoggedIn, setAuthError, email, password);
    const signOutHandler = () => signOut(setUser, setIsLoggedIn, setAuthError);
    const createAccountHandler = (email, password) => createAccount(setUser, setIsLoggedIn, setAuthError, email, password)

    /*onAuthStateChanged(auth, (user) => {
      console.log(`auth state changed. New user: ${user}`)
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        setIsLoggedIn(true);
      } else {
        // No user is signed in.
        setIsLoggedIn(false);
      }
    });*/

    const value = { 
        user, 
        isLoggedIn, 
        error: authError,
        signInHandler, 
        signOutHandler,
        createAccountHandler,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}