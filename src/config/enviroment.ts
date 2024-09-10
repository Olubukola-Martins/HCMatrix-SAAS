export const MICROSERVICE_ENDPOINTS = {

  
  UTILITY:
    process.env.REACT_APP_UTILITY_BASE_URL ??
    "https://api.staging.hcmatrix.com/v1/utility",
  AUTHENTICATION:
    process.env.REACT_APP_AUTHENTICATION_BASE_URL ??
    "https://api.staging.hcmatrix.com/v1/authentication",
  NOTIFICATION:
    process.env.REACT_APP_NOTIFICATION_BASE_URL ??
    "https://api.staging.hcmatrix.com/v1/notification",
  TIME_AND_ATTENDANCE:
    process.env.REACT_APP_TIME_AND_ATTENDANCE_BASE_URL ??
    "https://api.staging.hcmatrix.com/v1/time-and-attendance",
  PAYROLL:
    process.env.REACT_APP_PAYROLL_BASE_URL ??
    "https://api.staging.hcmatrix.com/v1/payroll",
  CHATBOT: process.env.REACT_APP_CHAT_BOT_BASE_URL

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

const getPaystackPublicKey = () => {
  if (process.env.NODE_ENV === "development")
    return process.env.REACT_APP_PAYSTACK_TEST_PUBLIC_KEY;
  return process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY;
};
export const PAYSTACK_PARAMETERS = {
  paystackPublicKey: getPaystackPublicKey(),
};
export const GEOLOCATION_PARAMETERS = {
  GOOGLE_GEO_CODE_API_KEY:
    process.env.REACT_APP_GOOGLE_GEO_CODE_API_KEY ??
    "AIzaSyBlCdkKZN6Qyw7kICLzgRDGuTkiF440P84",
};

export const GOOGLE_ANALYTICS_PARAMETERS = {
  GOOGLE_ANALYTICS_TRACKING_ID:
    process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID ?? "G-V3L8X72X1W",
};
