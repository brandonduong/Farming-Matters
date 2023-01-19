import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const handleError = (error, setIsLoggedIn, setAuthError) => {
    setAuthError(error);
    setIsLoggedIn(false);
}

const handleSuccess = (userCredential, setIsLoggedIn, setUser) => {
    setUser(userCredential.user);
    setIsLoggedIn(true);
}

export const signIn = async (setUser, setIsLoggedIn, setAuthError, email, password) => { 
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        handleSuccess(userCredential, setIsLoggedIn, setUser);
        
        return { userCredential, error: null }
    } catch(err) {
        handleError(err, setIsLoggedIn, setAuthError);
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

export const createAccount = async (setUser, setIsLoggedIn, setAuthError, displayName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        
        handleSuccess(userCredential, setIsLoggedIn, setUser);
        return { userCredential, error: null }

    } catch (err) {
        handleError(err,setIsLoggedIn,setAuthError);
        return { userCredential: null, error: err };
    }
}