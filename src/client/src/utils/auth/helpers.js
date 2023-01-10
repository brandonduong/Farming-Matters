import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


export const signIn = async (setUser, setIsLoggedIn, setAuthError, email, password) => { 
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        setUser(userCredential.user);
        setIsLoggedIn(true);
        
        return { userCredential, error: null }
    } catch(err) {
        setAuthError(err);
        setIsLoggedIn(false);
        
        return { userCredential: null, error: err };
    }
}

export const signOut = (setUser, setIsLoggedIn, setAuthError) => {
    auth.signOut().then(() => {
        setUser(null);
        setIsLoggedIn(false);
    }).catch((err) => {
        setAuthError(err);
    })
}

export const createAccount = (setUser, setIsLoggedIn, setAuthError, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoggedIn(true);
    }).catch((err) => {
        setAuthError(err);
        setIsLoggedIn(false);
    })
}