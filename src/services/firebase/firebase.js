import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import Cookies from 'js-cookie';
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { user } from "@nextui-org/react";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const app = getApps()[0];
const FirebaseAuth = getAuth();
export { FirebaseAuth, onAuthStateChanged };

export const Login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(userCredential);
        return { user: userCredential.user, statusCode: 200 };
    } catch (error) {
        console.log(error.code);
        return { error, statusCode: error.code };
    }
};

export const Logout = async () => {
    await signOut(FirebaseAuth);
}

export const Authentication = () => {
    return FirebaseAuth;
}


export const GetSignInErrorMessage = (code) => {
    switch (code) {
        case 'auth/invalid-credential':
            return 'Email atau password salah';
        case 'auth/too-many-requests':
            return 'Terlalu banyak percobaan, coba lagi nanti';
        default:
            return 'Server error';
    }
}

export const db = getFirestore(app);

const STORAGE_FOLDER_PATH = "gs://web-tekik.appspot.com";

export const storage = getStorage(getApps()[0], STORAGE_FOLDER_PATH);
