import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";

declare module "../firebase/firebase" {
  export const app: FirebaseApp;
  export const auth: Auth;
}