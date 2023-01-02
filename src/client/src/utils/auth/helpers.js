import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


export const signIn = (setAuthStatus, setAuthError, email, password) => { 
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        setAuthStatus('authorized');
    }).catch((err) => {
        setAuthError(err);
    })
}

export const signOut = (setAuthStatus, setAuthError) => {
    auth.signOut().then(() => {
        setAuthStatus('unauthorized');
    }).catch((err) => {
        setAuthError(err);
    })
}

export const createAccount = (setAuthStatus, setAuthError, email, password) => {
    createAccountWithEmailAndPassword(auth, email, password)
    .then(() => {
        setAuthStatus('authorized');
    }).catch((err) => {
        setAuthError(err);
    })
}