import { SignOutButton } from "./SignOutButton";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";

export const LoginPage = () => {
    
    return (
        <>
            <Login />
            <SignOutButton />
            <CreateAccount />
        </>
    );
}