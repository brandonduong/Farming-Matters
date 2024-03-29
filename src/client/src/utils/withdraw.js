import { auth } from './firebase';

export const deleteLoggingTable = async () => {
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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      AuthToken: idToken,
      UserId: userId,
    },
  };

  await fetch('/private/deleteUserTable', requestOptions);
};
