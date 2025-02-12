// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsS_FpZsxVQmr2jMegSn0MhKWbq1owtXc",
  authDomain: "expense-2fb68.firebaseapp.com",
  projectId: "expense-2fb68",
  storageBucket: "expense-2fb68.firebasestorage.app",
  messagingSenderId: "367506266051",
  appId: "1:367506266051:web:96868fb4e01e8c3de38f76",
  measurementId: "G-YB0CLC3P2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);