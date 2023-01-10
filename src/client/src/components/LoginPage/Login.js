import { useState } from "react";
import { useAuth } from "../../utils/auth/hooks";
import "./Login.css";

export const Login = () => {
    const { signInHandler } = useAuth();
    const [errorMessage, setErrorMessage] = useState(null);

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
        
        const { error } = await signInHandler(email, password)
        
        if (error?.code === 'auth/user-not-found' || error?.code === 'auth/wrong-password') {
          setErrorMessage('Username or password is incorrect.');
          return;

        } else if (error?.code === 'auth/wrong-password') {
          setErrorMessage('Email already in use.');
          return;

        } else if (error?.code === 'auth/email-already-exists') {
          setErrorMessage('Email already in use.');
          return;

        } else if (error?.code === 'auth/invalid-email') {
          setErrorMessage('Email is invalid.');
          return;

        } else if (error?.code === 'auth/invalid-password') {
          setErrorMessage('Password is invalid. Passwords must be at least 6 characters long.');
          return;

        } else if (error) {
          setErrorMessage(error.message);
          return;
        }

        // Logged in succesfully
        e.target.email.value = "";
        e.target.password.value = "";
        setErrorMessage(null);
      };

    return (
      <div className="login-container">
        <h1 className="title">Login</h1>
        <div className="error">{errorMessage}</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="example@gmail.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button className="primary">Login</button>
        </form>
      </div>
    );
}