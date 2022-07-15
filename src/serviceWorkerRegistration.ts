import { toast as ReactToast } from 'react-toastify';
import { ToastDefaultConfig } from 'shared';

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.0/8 are considered localhost for IPv4.
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

interface Config {
	onSuccess?: (registration: ServiceWorkerRegistration) => void;
	onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

export function register(toast: typeof ReactToast, config?: Config) {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		const publicUrl = new URL(process.env.PUBLIC_URL || '/Scorie', window.location.href);

		if (publicUrl.origin !== window.location.origin) return;

		window.addEventListener('load', () => {
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
			let isAppOnline = navigator.onLine;

			window.addEventListener('online', () => {
				if (!isAppOnline) {
					toast('🦄 The connectivity is back, sync in progress...', {
						...ToastDefaultConfig,
						autoClose: 4000,
					});
					isAppOnline = true;
				}
			});

			window.addEventListener('offline', () => {
				toast.warn(
					'The app is running offline, any changes mades during this time will be synced as soon as the connectivity is back',
					{
						...ToastDefaultConfig,
						autoClose: 6000,
					}
				);
				isAppOnline = false;
			});

			if (isLocalhost) {
				checkValidServiceWorker(swUrl, toast, config);

				navigator.serviceWorker.ready.then(() => {
					console.log('This web app is being served cache-first by a service worker');
				});
			} else {
				// Is not localhost. Just register service worker
				registerValidSW(swUrl, toast, config);
			}
		});
	}
}

function pushNotificationHandle(registration: ServiceWorkerRegistration) {
	registration.pushManager.getSubscription().then(() => {
		console.log('Push manager subscripted');
	});
}

function registerValidSW(swUrl: string, toast: typeof ReactToast, config?: Config) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) return;

				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							toast.info('🔄 New content is available! Refresh to get the latest changes.', {
								...ToastDefaultConfig,
								autoClose: 4000,
							});

							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							toast('🚀 Content is cached for offline use.', {
								...ToastDefaultConfig,
								autoClose: 4000,
							});

							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};

			pushNotificationHandle(registration);
		})
		.catch((error) => {
			console.error('Error during service worker registration:', error);
		});
}

function checkValidServiceWorker(swUrl: string, toast: typeof ReactToast, config?: Config) {
	fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
		.then((response) => {
			const contentType = response.headers.get('content-type');

			if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				registerValidSW(swUrl, toast, config);
			}
		})
		.catch(() => {
			toast('No internet connection found. App is running in offline mode.', {
				...ToastDefaultConfig,
				autoClose: 4000,
			});
		});
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister();
			})
			.catch((error) => {
				console.error('[Unregister SW Error] : ', error.message);
			});
	}
}
