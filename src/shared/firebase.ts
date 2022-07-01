import { firebaseConfig } from 'config';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'production') getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
