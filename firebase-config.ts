import {initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBszzCM9cvHeAIYwYw_ZwpMebD78E-g_nk",
    authDomain: "talktome-89105.firebaseapp.com",
    projectId: "talktome-89105",
    storageBucket: "talktome-89105.appspot.com",
    messagingSenderId: "560523844909",
    appId: "1:560523844909:web:d4c0f5c6ce0da31b9bc7a4",
    measurementId: "G-JJBLFDCSFZ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, db };
