import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBy00Wz55Js3BavetByhxWUtSEjNOO_HbE",
  authDomain: "museus-aumentados.firebaseapp.com",
  projectId: "museus-aumentados",
  storageBucket: "museus-aumentados.appspot.com",
  messagingSenderId: "602346837072",
  appId: "1:602346837072:web:82ec474b46a86c80f56d55",
  databaseURL: "https://museus-aumentados-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // ✅ Cria a instância do Realtime Database

import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export { database, auth };


export { database }; 