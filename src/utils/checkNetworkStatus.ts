export const checkOnlineStatus = async () => {
	try {
		const online = await fetch('/1pixel.png');
		console.log('App is running in online mode');

		return online.status >= 200 && online.status < 300;
	} catch (err) {
		console.log('App is running in offline mode');

		return false;
	} finally {
		console.log('Finish checking app status !');
	}
};
