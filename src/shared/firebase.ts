import { firebaseConfig } from 'config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'production') getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
