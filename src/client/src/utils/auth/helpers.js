import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


export const signIn = (setIsLoggedIn, setAuthError, email, password) => { 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setUser(userCredential.user)
        setIsLoggedIn(true);
    }).catch((err) => {
        setAuthError(err);
        setIsLoggedIn(false)
    })
}

export const signOut = (setIsLoggedIn, setAuthError) => {
    auth.signOut().then(() => {
        setIsLoggedIn(false);
    }).catch((err) => {
        setAuthError(err);
    })
}

export const createAccount = (setAuthStatus, setAuthError, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoggedIn(true);
    }).catch((err) => {
        setAuthError(err);
        setIsLoggedIn(false);
    })
}