import { firebaseConfig as FIREBASE_CONFIG } from '@/config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Dispatch, SetStateAction } from 'react';

const { webPushCertificate, ...firebaseConfig } = FIREBASE_CONFIG;

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const messaging = getMessaging(firebaseApp);

process.env.NODE_ENV === 'production' && getAnalytics(firebaseApp);
enableIndexedDbPersistence(db, { forceOwnership: false }).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Persistance failed');
  } else if (err.code === 'unimplemented') {
    console.log('Persistance not availabel');
  }
});

export const getFCMToken = () => getToken(messaging, { vapidKey: webPushCertificate });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
