import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Get this from https://console.firebase.google.com
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
