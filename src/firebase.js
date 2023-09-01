// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBqlOhG50xSvFNt68TEN_KwfcswscddYE",
  authDomain: "opinion-a-social-media-app.firebaseapp.com",
  projectId: "opinion-a-social-media-app",
  storageBucket: "opinion-a-social-media-app.appspot.com",
  messagingSenderId: "548696523042",
  appId: "1:548696523042:web:2f99a0417a5d950eda257b",
  measurementId: "G-8QLTYFTTNZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);