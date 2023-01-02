import React, { createContext, useState } from "react";
import { auth } from "../firebase";
import { signIn, signOut, createAccount } from "./helpers";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authStatus, setAuthStatus] = useState('unauthorized');
    const [authError, setAuthError] = useState(null);

    const signInHandler = (email, password) => signIn(setAuthStatus, setAuthError, email, password);
    const signOutHandler = () => signOut(setAuthStatus, setAuthError);
    const createAccountHandler = (email, password) => createAccount(setAuthStatus, setAuthError, email, password)

    const user = auth.currentUser;

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const isLoggedIn = true;
      } else {
        // No user is signed in.
      }

    const value = { 
        uid, 
        isLoggedIn: authStatus === 'authorized' ? true : false, 
        error: authError,
        signInHandler, 
        signOutHandler,
        createAccountHandler,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}