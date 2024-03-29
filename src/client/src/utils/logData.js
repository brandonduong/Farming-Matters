import { auth } from './firebase';

export const logData = async (data) => {
  let idToken = '';
  let userId = '';

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : '';
  } catch (error) {
    console.error(error);
  }

  try {
    userId = auth.currentUser ? await auth.currentUser.uid : '';
  } catch (error) {
    console.error(error);
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      AuthToken: idToken,
    },
    body: JSON.stringify({ userId, data }),
  };

  await fetch('/private/logactions', requestOptions);
};
