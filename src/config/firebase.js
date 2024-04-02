import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC64wFiKQo_4AVYN88PvxYWjD3BR2PBkeU",
    authDomain: "loanfeasibility-47b71.firebaseapp.com",
    databaseURL: "https://loanfeasibility-47b71-default-rtdb.firebaseio.com",
    projectId: "loanfeasibility-47b71",
    storageBucket: "loanfeasibility-47b71.appspot.com",
    messagingSenderId: "492890889134",
    appId: "1:492890889134:web:faeca5ba19972e6a8ec63f",
    measurementId: "G-FBFQRVZZ7V"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }