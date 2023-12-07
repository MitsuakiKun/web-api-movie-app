// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFsOyq1mywrJPkZzaF0w0pFrwkOSrbuK8",
  authDomain: "extend-react-movie-app.firebaseapp.com",
  projectId: "extend-react-movie-app",
  storageBucket: "extend-react-movie-app.appspot.com",
  messagingSenderId: "69266542554",
  appId: "1:69266542554:web:d3d7b408b69e8b6ababae3",
  measurementId: "G-QL5WXX827R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default firebaseConfig;