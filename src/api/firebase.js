import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy00Wz55Js3BavetByhxWUtSEjNOO_HbE",
  authDomain: "museus-aumentados.firebaseapp.com",
  databaseURL: "https://museus-aumentados-default-rtdb.firebaseio.com",
  projectId: "museus-aumentados",
  storageBucket: "museus-aumentados.firebasestorage.app",
  messagingSenderId: "602346837072",
  appId: "1:602346837072:web:82ec474b46a86c80f56d55"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);


export { database, auth };
