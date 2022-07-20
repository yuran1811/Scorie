import { ToastDefaultConfig } from '@/shared';
import { toast } from 'react-toastify';
import { registerSW } from 'virtual:pwa-register';

window.addEventListener('load', () => {
  let isAppOnline = navigator.onLine;

  window.addEventListener('online', () => {
    if (!isAppOnline) {
      toast.info('The connectivity is back, sync in progress...', {
        ...ToastDefaultConfig,
        autoClose: 4000,
        position: 'top-center',
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
        position: 'top-center',
      }
    );
    isAppOnline = false;
  });
});

export const updateSW = registerSW({
  onNeedRefresh() {
    toast.info('New content is available! Refresh to get the latest changes.', {
      ...ToastDefaultConfig,
      autoClose: 4000,
      position: 'top-center',
      onClick() {
        updateSW(true);
      },
    });
  },
  onOfflineReady() {
    toast.info('🚀 Content is cached for offline use.', {
      ...ToastDefaultConfig,
      autoClose: 4000,
      position: 'top-center',
    });
  },
  onRegisterError(error) {
    toast.error('Cannot regist service workers. Please try again!', {
      ...ToastDefaultConfig,
      autoClose: 4000,
      position: 'top-center',
    });

    console.log(error);
  },
});
