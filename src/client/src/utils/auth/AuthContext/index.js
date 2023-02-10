import { io } from 'socket.io-client';
import React, { createContext, useState } from "react";
import { signIn, signOut, createAccount } from "../helpers";
import { useNavigate } from "react-router-dom";
import { getSessionUser, getSessionIsLoggedIn, getIsActiveSession, getIsDenied, useSessionStorage} from './sessionStorageHelpers';

export const AuthContext = createContext();

// Initialize the websocket on the client side
const socket = io();

export const AuthProvider = ({children}) => {
    const [authError, setAuthError] = useState();
    const [user, setUser] = useState(getSessionUser());
    const [isLoggedIn, setIsLoggedIn] = useState(getSessionIsLoggedIn());
    const [isActiveSession, setIsActiveSession] = useState(getIsActiveSession());
    const [isDenied, setIsDenied] = useState(getIsDenied());

    useSessionStorage(user, isLoggedIn, isActiveSession, isDenied, socket);

    const signInHandler = async (email, password) => await signIn(setUser, setIsLoggedIn, setAuthError, email, password);
    const signOutHandler = () => signOut(setUser, setIsLoggedIn, setAuthError);
    const createAccountHandler = async (displayName, email, password) => await createAccount(
      setUser, 
      setIsLoggedIn, 
      setAuthError, 
      displayName, 
      email, 
      password
    );

    const navigate = useNavigate();
    // Event handlers to check if sign in is denied due to multiple sessions present.
    socket.on('accept', () => {
      setIsActiveSession(true);
      setIsDenied(false);
      navigate('/play');
    })

    socket.on('deny', () => {
      setIsDenied(true);
      setIsActiveSession(false);
      setUser(null);
      setIsLoggedIn(false);
    });

    const value = { 
        user, 
        isLoggedIn,
        setIsLoggedIn, 
        isActiveSession,
        setIsActiveSession,
        isDenied,
        setIsDenied,
        error: authError,
        signInHandler, 
        signOutHandler,
        createAccountHandler,
        socket,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}