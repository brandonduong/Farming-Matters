import { auth } from "./firebase";

// Need to make it so it sends database connection details to verify identity
export const createConnection = async () => {
  let idToken = "";

  try {
    idToken = auth.currentUser ? await auth.currentUser.getIdToken(true) : "";
  } catch (error) {
    console.error(error);
  }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      AuthToken: idToken,
    },
  };

  const res = await fetch("/private/connectToDatabase", requestOptions);
  console.log("response: ", res);
};
