import { initializeApp } from "firebase/app";
import {
  Messaging,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { FIREBASE_PARAMETERS } from "./enviroment";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // apiKey: FIREBASE_PARAMETERS.apiKey,
  // authDomain: FIREBASE_PARAMETERS.authDomain,
  // projectId: FIREBASE_PARAMETERS.projectId,
  // storageBucket: FIREBASE_PARAMETERS.storageBucket,
  // messagingSenderId: FIREBASE_PARAMETERS.messagingSenderId,
  // appId: FIREBASE_PARAMETERS.appId,
  // measurementId: FIREBASE_PARAMETERS.measurementId,

  apiKey: "AIzaSyB_WSDPvn8CSKmSbGCGdSMnFPsZlPHsu1U",
  authDomain: "talk2much-30481.firebaseapp.com",
  projectId: "talk2much-30481",
  storageBucket: "talk2much-30481.appspot.com",
  messagingSenderId: "613054975604",
  appId: "1:613054975604:web:a10f24853209ef84b40b21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging: Messaging = getMessaging(app);

export const requestFirebaseToken = async (
  setTokenFound?: (val: boolean) => void
) => {
  try {
    const currentToken = await getToken(messaging, {
      // vapidKey: FIREBASE_PARAMETERS.vapidKey,
      vapidKey:
        "BPz9WkvzePYbaW-07y4KVS9F8OZQyc7LBcANo4fnyFPY2HJggdZye34Q52iURQ9omswM_e83oTGQEr7DdvB9hQ0",
    });
    if (currentToken) {
      console.log("current token for client: ", currentToken);
      localStorage.setItem("fireBaseToken", currentToken);
      setTokenFound?.(true);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      setTokenFound?.(false);
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

// Check if the user has already granted permission to receive notifications
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    // If permission is granted, register your service worker
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        // Set the messaging instance to use the registered service worker
        onMessage(messaging, (payload) => {
          console.log("payload...", payload);
        });
        console.log("Received ________ registration: ", registration);
      });
  } else {
    console.log("Notification permission denied");
  }
});

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload...", payload);
      resolve(payload);
    });
  });
