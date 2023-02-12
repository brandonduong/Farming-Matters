import { useAuth } from "../../utils/auth/hooks";

export const SignOutButton = () => {
  const { user, signOutHandler, socket, setIsLoggedIn } = useAuth();
  const handleSignOut = () => {
    signOutHandler();
    socket.emit("logout", user.uid);
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <button
      className="info-header-button"
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};
