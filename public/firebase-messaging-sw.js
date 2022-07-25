importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyAj_xanq5aqiXAu0FROpvIAENh9P96SSgg',
  appId: '1:1051680361693:web:96679202061ca1cba11f34',
  authDomain: 'scorie-fb-server.firebaseapp.com',
  databaseURL: 'https://scorie-fb-server-default-rtdb.asia-southeast1.firebasedatabase.app',
  measurementId: 'G-WZMJBPYTYL',
  messagingSenderId: '1051680361693',
  projectId: 'scorie-fb-server',
  storageBucket: 'scorie-fb-server.appspot.com',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
