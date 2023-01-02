import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwB2oT7H8RN-CZ1HvuDxNzAqi8bOmd5OU",
  authDomain: "farming-matters-e8dee.firebaseapp.com",
  projectId: "farming-matters-e8dee",
  storageBucket: "farming-matters-e8dee.appspot.com",
  messagingSenderId: "992711225870",
  appId: "1:992711225870:web:b9438a9047723562b8c25f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);