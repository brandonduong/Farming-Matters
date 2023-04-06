import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Exposes all auth information to the React app, including setters for properties.
 * @returns user - object containing auth info related to the user (email, displayname, etc.). See https://firebase.google.com/docs/reference/js/v8/firebase.User.
 * @returns isLoggedIn - Whether or not the user is currently logged in (boolean).
 * @returns setIsLoggedIn - sets the value of isLoggedIn.
 * @returns isActiveSession - Whether or not the current session is the single permitted active session (boolean).
 * @returns setIsActiveSession - sets the value of isActiveSession.
 * @returns isDenied - Whether or not the user is denied due to an authentication error (boolean).
 * @returns setIsDenied - sets the value of isDenied.
 * @returns error - The authentication error raised (if any) during authentication.
 * @returns signInHandler - A function to sign a user in. Takes email and password as parameters.
 * @returns signOutHandler - A function that signs a user out when called.
 * @returns createAccountHandler - A function that creates a new account. Takes display name, email, and password as parameters.
 * @returns socket - The socket client instance used to communicate with the server-side socket. See https://socket.io/
 */
export const useAuth = () => useContext(AuthContext);
