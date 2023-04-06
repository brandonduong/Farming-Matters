import { auth } from './firebase';

// Need to make it so it sends database connection details to verify identity
export const createConnection = async () => {
  let idToken = '';
  let userId = '';

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : '';
    userId = auth.currentUser ? await auth.currentUser.uid : '';
  } catch (error) {
    console.error(error);
  }

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthToken: idToken,
      userId: userId,
    },
  };

  await fetch('/private/connectToDatabase', requestOptions);
};
