import { useAuth } from "../../utils/auth/hooks";

export const SignOutButton = (props) => {
  const { user, signOutHandler, socket, setIsLoggedIn } = useAuth();
  const handleSignOut = () => {
    signOutHandler();
    socket.emit("logout", user.uid);
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <button
      className={props.header ? "info-header-button" : "end-game-button"}
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};
