import { firebaseConfig as FIREBASE_CONFIG } from '@/config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const { webPushCertificate, cloudMessagingServerKey, ...firebaseConfig } = FIREBASE_CONFIG;

export const firebaseApp = initializeApp(firebaseConfig);

initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
// export const messaging = getMessaging(firebaseApp);

process.env.NODE_ENV === 'production' && getAnalytics(firebaseApp);

// enableIndexedDbPersistence(db, { forceOwnership: false }).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     console.log('Persistance failed');
//   }

//   if (err.code === 'unimplemented') {
//     console.log('Persistance not available');
//   }
// });

// export const getFCMToken = () => getToken(messaging, { vapidKey: webPushCertificate });

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
