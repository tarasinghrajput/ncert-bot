// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, User } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHa-O03-WdY95rPJb9xu475y_RqPWMC0c",
  authDomain: "ncert-bot-auth-2.firebaseapp.com",
  projectId: "ncert-bot-auth-2",
  messagingSenderId: "124437727872",
  appId: "1:124437727872:web:b74859293d297b9e48f465",
  measurementId: "G-GB6ZEKK8T2"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
export type { User };