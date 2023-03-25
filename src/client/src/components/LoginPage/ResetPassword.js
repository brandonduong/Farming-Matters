import { useState } from "react";
import { useAuth } from "../../utils/auth/hooks";
import "../../css/Login.css";
import { auth } from "../../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export const ResetPassword = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        if (!email) {
            setErrorMessage('Please enter an email')
        }

        sendPasswordResetEmail(auth, email).then(() => {
            setIsSuccess(true)
            setErrorMessage('');
        })//.catch((error) => setErrorMessage(error.message))
    }

    return (
        <div className="reset-container">
            <h1 className="title">Reset your password &darr;</h1>
            <form className="form" onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
            <div className="input-group" style={{marginBottom: '20px'}}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="example@gmail.com" />
            </div>
            <button className="primary login-button">Reset Password</button>
            </form>
            {errorMessage && <div className="reset-error">{errorMessage}</div>}
            {(!errorMessage && isSuccess) && <div className="success">If an account with that email exists, you'll recieve a reset link.</div>}
        </div>
    );
}