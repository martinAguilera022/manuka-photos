// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
	apiKey: "AIzaSyA9G3YIUA5AHzGvk6v42Ulz9I3Vfts3-CU",
	authDomain: "manuka-3e3ba.firebaseapp.com",
	projectId: "manuka-3e3ba",
	storageBucket: "manuka-3e3ba.firebasestorage.app",
	messagingSenderId: "640149824117",
	appId: "1:640149824117:web:f9adef9b7683db8c0a4e3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Export services (esto es lo que vas a usar)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
