// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// // const self = window.re;
// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   //   databaseURL: "https://project-id.firebaseio.com", //find out if needed and then ask backend 4 it

//   apiKey: "AIzaSyBlCdkKZN6Qyw7kICLzgRDGuTkiF440P84",
//   authDomain: "hcmatrix3.firebaseapp.com",
//   projectId: "hcmatrix3",
//   storageBucket: "hcmatrix3.appspot.com",
//   messagingSenderId: "758826222289",
//   appId: "1:758826222289:web:85412fd2d82731ef27bbf0",
//   measurementId: "G-92HNXK7GX8",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo192.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
