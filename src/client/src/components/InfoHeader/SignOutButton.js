import { useAuth } from "../../utils/auth/hooks";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export const SignOutButton = () => {
  const { user, signOutHandler, socket, setIsLoggedIn } = useAuth();
  const handleSignOut = () => {
    signOutHandler();
    socket.emit("logout", user.uid);
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  return (

    <Button
      className="info-header-button"
      type="button"
      variant="light"
      size="lg"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};
