export const handleError = (error, setErrorMessage) => {
  if (
    error?.code === 'auth/user-not-found' ||
    error?.code === 'auth/wrong-password'
  ) {
    setErrorMessage('Username or password is incorrect.');
  } else if (
    error?.code === 'auth/email-already-exists' ||
    error?.code === 'auth/email-already-in-use'
  ) {
    setErrorMessage('Email already in use.');
  } else if (error?.code === 'auth/invalid-email') {
    setErrorMessage('Email is invalid.');
  } else if (
    error?.code === 'auth/invalid-password' ||
    error?.code === 'auth/weak-password'
  ) {
    setErrorMessage(
      'Password is too weak. Passwords must be at least 6 characters long.',
    );
  } else if (error) {
    console.error(error);
    setErrorMessage(error.message);
  } else {
    setErrorMessage(null);
  }
};
