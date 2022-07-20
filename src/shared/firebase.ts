import { firebaseConfig } from '@/config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'production') getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

enableIndexedDbPersistence(db, { forceOwnership: false }).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Persistance failed');
  } else if (err.code === 'unimplemented') {
    console.log('Persistance not availabel');
  }
});
