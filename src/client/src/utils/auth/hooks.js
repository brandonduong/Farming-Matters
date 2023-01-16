import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Exposes all auth information to the React app, including setters for properties.
 * @returns user - object containing auth info related to the user (email, displayname, etc.).
 * @returns isLoggedIn - Whether or not the user is currently logged in (boolean).
 * @returns setIsLoggedIn - sets the value of isLoggedIn.
 */
export const useAuth = () => useContext(AuthContext);