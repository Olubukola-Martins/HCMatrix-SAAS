import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
const messaging = getMessaging(app);

export const getFirebaseToken = async (
  setTokenFound?: (val: boolean) => void
) => {
  try {
    const currentToken = await getToken(messaging, {
      // vapidKey: FIREBASE_PARAMETERS.vapidKey,
      vapidKey:
        "BNksQuoGE7iAnui3NM6TeLKazyCTI25mwZzNMPTqmWu9vRDfl-19AeyxAoS7z9tVfl14tJob9bLVNNFhof9kcSc",
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

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload...", payload);
      resolve(payload);
    });
  });
