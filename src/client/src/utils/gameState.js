import { auth } from "./firebase";

// Need to make it so it sends database connection details to verify identity
export const saveGame = async (gameData) => {
  let idToken = "";
  let userId = "";

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : "";
  } catch (error) {
    console.error(error);
  }

  try {
    userId = auth.currentUser ? await auth.currentUser.uid : "";
  } catch (error) {
    console.error(error);
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      AuthToken: idToken,
    },
    body: JSON.stringify({ userId, gameData }),
  };

  await fetch("/private/saveGame", requestOptions);
};

// Need to make it so it sends database connection details to verify identity
export const retrieveSavedGame = async () => {
  let idToken = "";
  let userId = "";

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : "";
  } catch (error) {
    console.error(error);
  }

  try {
    userId = auth.currentUser ? await auth.currentUser.uid : "";
  } catch (error) {
    console.error(error);
  }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      AuthToken: idToken,
      UserId: userId,
    },
  };

  await fetch("/private/loadGame", requestOptions);
};
