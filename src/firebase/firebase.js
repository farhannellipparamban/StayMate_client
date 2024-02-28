// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bookbreeze-c1446.firebaseapp.com",
  projectId: "bookbreeze-c1446",
  storageBucket: "bookbreeze-c1446.appspot.com",
  messagingSenderId: "484451159555",
  appId: "1:484451159555:web:5cb25a93ff224ceceac836"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);