export const axiosConfig = {
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
		Authorization: '',
	},
};

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY as string,
	authDomain: process.env.REACT_APP_AUTHORIZED_DOMAIN as string,
};
