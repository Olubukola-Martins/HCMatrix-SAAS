import { initializeApp } from "firebase/app";
import { Messaging, getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBlCdkKZN6Qyw7kICLzgRDGuTkiF440P84",
  authDomain: "hcmatrix3.firebaseapp.com",
  projectId: "hcmatrix3",
  storageBucket: "hcmatrix3.appspot.com",
  messagingSenderId: "758826222289",
  appId: "1:758826222289:web:85412fd2d82731ef27bbf0",
  measurementId: "G-92HNXK7GX8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service

export const messaging = async (): Promise<Messaging | null> => {
  const browserSupports = await isSupported();
  if (browserSupports) {
    return getMessaging(app);
  }
  return null;
};
