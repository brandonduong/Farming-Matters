import { useAuth } from "../../utils/auth/hooks";

export const CreateAccount = () => {
    const { createAccountHandler } = useAuth();
    
    return (
        <div onClick={() => createAccountHandler("newuser@gmail.com", "thisismypassword")}>
            Create Account
        </div>
    );
}