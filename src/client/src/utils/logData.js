import { auth } from "./firebase";

export const logData = async (action, data) => {
    let idToken = '';
    
    try {
        idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : '';
    } catch(error) {
        console.error(error);
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': idToken,
        },
            body: JSON.stringify({action, ...data})
        }

    await fetch('/private/actions', requestOptions)
}