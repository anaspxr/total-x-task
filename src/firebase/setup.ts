import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXv64XFjhGpDPi-2fXeOuuCVuzZ-PWhuA",
  authDomain: "totalx-task-52beb.firebaseapp.com",
  projectId: "totalx-task-52beb",
  storageBucket: "totalx-task-52beb.firebasestorage.app",
  messagingSenderId: "totalx-task-52beb",
  appId: "1:251416018807:web:11c026eedeec2890bdeb72"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);