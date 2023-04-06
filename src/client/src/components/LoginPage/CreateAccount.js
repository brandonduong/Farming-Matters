import { useState } from 'react';
import { useAuth } from '../../utils/auth/hooks';
import '../../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { handleError } from './helpers';

export const CreateAccount = () => {
  const { createAccountHandler, socket } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!email) {
      setErrorMessage('Email is required.');
      return;
    } else if (!password) {
      setErrorMessage('Password is required.');
      return;
    } else if (!displayName) {
      setErrorMessage('Display name is required.');
      return;
    } else if (displayName.length > 10) {
      setErrorMessage('Display name must be 10 or less characters.');
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const { userCredential, error } = await createAccountHandler(
      displayName,
      email,
      password,
    );
    handleError(error, setErrorMessage);

    if (!error) {
      // Created account succesfully
      e.target.email.value = '';
      e.target.password.value = '';
      e.target.confirmPassword.value = '';
      e.target.displayName.value = '';

      socket.emit('login', userCredential.user.uid);
      navigate('/play');
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Create Account</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="example@gmail.com" />
        </div>
        <div className="input-group">
          <label htmlFor="displayName">Display Name</label>
          <input type="displayName" name="displayName" placeholder="user123" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" />
        </div>
        <button className="secondary login-button">Create Account</button>
      </form>
    </div>
  );
};
