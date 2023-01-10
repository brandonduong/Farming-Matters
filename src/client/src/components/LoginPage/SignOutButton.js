import { useAuth } from "../../utils/auth/hooks";

export const SignOutButton = () => {
    const { signOutHandler } = useAuth();

    return (
        <div onClick={signOutHandler}>
            Sign Out
        </div>
    )
}