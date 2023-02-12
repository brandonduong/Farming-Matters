import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";

export const LoginPage = () => 
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px"}}>
            <Login />
            <CreateAccount />
        </div>

