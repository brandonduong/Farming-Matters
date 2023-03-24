import { auth } from "./firebase";

// Need to make it so it sends database connection details to verify identity
export const saveGame = async (gameData) => {
  let idToken = "";
  let userId = "";

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : "";
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

  let gameState;
  gameState = await fetch("/private/loadGame", requestOptions);
  gameState = gameState.json().then((currentGameState) => {
    return currentGameState;
  });
  return gameState;
};

export const resetGame = async () => {
  let idToken = "";
  let userId = "";

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : "";
    userId = auth.currentUser ? await auth.currentUser.uid : "";
  } catch (error) {
    console.error(error);
  }

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      AuthToken: idToken,
      UserId: userId,
    },
  };

  await fetch("/private/deleteGame", requestOptions);
};
