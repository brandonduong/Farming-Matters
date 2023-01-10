import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9mLGi6G3y1Wl-fibqLB_zT1VD8aFfknU",
  authDomain: "farming-matters.firebaseapp.com",
  projectId: "farming-matters",
  storageBucket: "farming-matters.appspot.com",
  messagingSenderId: "99273253851",
  appId: "1:99273253851:web:890373999eb22c22337dfe"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);