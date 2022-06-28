export const axiosConfig = {
	baseURL: process.env.REACT_APP_API_URL,
	headers: { 'content-type': 'application/json' },
};

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY as string,
	appId: process.env.REACT_APP_APPID as string,
	authDomain: process.env.REACT_APP_AUTHORIZED_DOMAIN as string,
	databaseURL: process.env.REACT_APP_DATABASEURL as string,
	measurementId: process.env.REACT_APP_MEASUREMENTID as string,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID as string,
	projectId: process.env.REACT_APP_PROJECTID as string,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET as string,
};
