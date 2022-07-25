export const axiosConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'content-type': 'application/json' },
};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  appId: import.meta.env.VITE_APPID as string,
  authDomain: import.meta.env.VITE_AUTHORIZED_DOMAIN as string,
  databaseURL: import.meta.env.VITE_DATABASEURL as string,
  measurementId: import.meta.env.VITE_MEASUREMENTID as string,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
  projectId: import.meta.env.VITE_PROJECTID as string,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
  webPushCertificate: import.meta.env.VITE_WEB_PUSH_CERTIFICATE as string,
  cloudMessagingServerKey: import.meta.env.VITE_CLOUD_MESSAGING_SERVER_KEY as string,
};

export const routes = {
  subjects: 'subjects',
  notes: 'notes',
  analytics: 'analytics',
  tools: 'tools',
};
