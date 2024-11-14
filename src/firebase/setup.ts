import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf_Ko4v3s35g4Bg1LXgQXO4AISmsWipec",
  authDomain: "total-x-task-83246.firebaseapp.com",
  projectId: "total-x-task-83246",
  storageBucket: "total-x-task-83246.firebasestorage.app",
  messagingSenderId: "7847035759",
  appId: "1:7847035759:web:82a6093b62a3779f73de9a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
