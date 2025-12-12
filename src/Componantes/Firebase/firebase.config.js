// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUWPoXdVGr-uSdZxgDBPRpfq2WWxJ8mws",
  authDomain: "public-issue-reporting-s-6d1a1.firebaseapp.com",
  projectId: "public-issue-reporting-s-6d1a1",
  storageBucket: "public-issue-reporting-s-6d1a1.firebasestorage.app",
  messagingSenderId: "574891146190",
  appId: "1:574891146190:web:7deb91196f3377291c899f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app