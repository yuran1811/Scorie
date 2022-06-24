export const checkOnlineStatus = async () => {
	try {
		const online = await fetch('/1pixel.png');
		return online.status >= 200 && online.status < 300;
	} catch (err) {
		console.log('Go offline !');
		return false;
	}
};
