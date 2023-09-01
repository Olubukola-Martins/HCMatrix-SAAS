export const MICROSERVICE_ENDPOINTS = {
  UTILITY: process.env.REACT_APP_UTILITY_BASE_URL,
  AUTHENTICATION: process.env.REACT_APP_AUTHENTICATION_BASE_URL,
  NOTIFICATION: process.env.REACT_APP_NOTIFICATION_BASE_URL,
  TIME_AND_ATTENDANCE: process.env.REACT_APP_TIME_AND_ATTENDANCE_BASE_URL,
};

export const APP_AUTHENTICATION_PARAMETERS = {
  SESSION_TIME: process.env.REACT_APP_SESSION_TIME,
  TOKEN_EXPIRY_TIME: process.env.REACT_APP_TOKEN_EXPIRY_TIME,
  TOKEN_INTERVAL_TIME: process.env.REACT_APP_TOKEN_INTERVAL_TIME,
};

export const FIREBASE_PARAMETERS = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
  vapidKey: process.env.REACT_APP_FIREBASE_vapidKey,
};

