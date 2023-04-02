import { useState } from "react";
import { useAuth } from "../../utils/auth/hooks";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";
import { handleError } from "./helpers";

export const Login = () => {
    const { signInHandler, socket } = useAuth();
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email) {
          setErrorMessage("Email is required.");
          return;

        } else if (!password) {
          setErrorMessage("Password is required.");
          return;
        } 
        
        const { userCredential, error } = await signInHandler(email, password)
        
        handleError(error, setErrorMessage);

        if (!error) {
          // Logged in succesfully
          e.target.email.value = "";
          e.target.password.value = "";

          socket.emit('login', userCredential.user.uid);
          navigate('/play');
        }
      };

    return (
      <div className="login-container">
        <h1 className="title">Login</h1>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="example@gmail.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          
          <button className="primary login-button">Login</button>
        </form>
      </div>
    );
}