import { useAuth } from "../../utils/auth/hooks";

export const SignOutButton = () => {
    const { user, signOutHandler, socket, setIsLoggedIn } = useAuth();
    const handleSignOut = () => {
        signOutHandler();
        socket.emit('logout', user.uid);
        setIsLoggedIn(false);
        sessionStorage.clear();
    }

    return (
        <div onClick={handleSignOut}>
            Sign Out
        </div>
    )
}