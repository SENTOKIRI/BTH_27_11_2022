import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAGKA2Cci_Vl8EGpOhkjM_yBes6MA8W6B4",
    authDomain: "native-app-208f7.firebaseapp.com",
    projectId: "native-app-208f7",
    storageBucket: "native-app-208f7.appspot.com",
    messagingSenderId: "132912664417",
    appId: "1:132912664417:web:0feabed85c74ea5c01ff20"
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { authentication, db, storage };