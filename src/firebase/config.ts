import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5N8uw1uCUSJp2KtfXp14rUAFiYOsq3Z4",
    authDomain: "ecom-web-app-fd6a5.firebaseapp.com",
    projectId: "ecom-web-app-fd6a5",
    storageBucket: "ecom-web-app-fd6a5.firebasestorage.app",
    messagingSenderId: "315248661612",
    appId: "1:315248661612:web:79a27d2e54039aceb43449",
    measurementId: "G-EVGRMQWTJ1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
