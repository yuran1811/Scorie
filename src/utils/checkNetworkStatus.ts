import { disableNetwork } from 'firebase/firestore';
import { db } from 'shared';

export const checkNetworkStatus = async () => {
	try {
		const online = await fetch('/1pixel.png');
		console.log('App is running in online mode');

		return online.status >= 200 && online.status < 300;
	} catch (err) {
		console.log('App is running in offline mode');

		await disableNetwork(db);

		return false;
	} finally {
		console.log('Finish checking app status !');
	}
};
