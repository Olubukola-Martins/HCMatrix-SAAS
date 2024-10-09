/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlCdkKZN6Qyw7kICLzgRDGuTkiF440P84",
  authDomain: "hcmatrix3.firebaseapp.com",
  projectId: "hcmatrix3",
  storageBucket: "hcmatrix3.appspot.com",
  messagingSenderId: "758826222289",
  appId: "1:758826222289:web:85412fd2d82731ef27bbf0",
  measurementId: "G-92HNXK7GX8",
});

const messaging = firebase.messaging(firebaseApp);

messaging.onBackgroundMessage(messaging, (payload) => {
  // Customize notification here
  const notificationTitle =
    payload.notification.title ?? "Background Message Title";
  const notificationOptions = {
    body: payload.notification.body ?? "Background Message body.",
    icon: "/matrix_logo.png",
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
