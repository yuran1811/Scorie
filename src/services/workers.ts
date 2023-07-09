import { ToastDefaultConfig } from '@/shared';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { registerSW } from 'virtual:pwa-register';

window.addEventListener('load', () => {
  let isAppOnline = navigator.onLine;

  window.addEventListener('online', () => {
    if (!isAppOnline) {
      toast.info(t('the connectivity is back, sync in progress'), {
        ...ToastDefaultConfig,
        autoClose: 4500,
        position: 'top-center',
      });
      isAppOnline = true;
    }
  });

  window.addEventListener('offline', () => {
    toast.warn(
      t('the app is running offline, any changes mades during this time will be synced as soon as the connectivity is back'),
      {
        ...ToastDefaultConfig,
        autoClose: false,
        position: 'top-center',
      }
    );
    isAppOnline = false;
  });
});

export const updateSW = registerSW({
  onNeedRefresh() {
    toast.info(t('new content is available'), {
      ...ToastDefaultConfig,
      autoClose: 4000,
      position: 'top-center',
      onClick() {
        updateSW(true);
      },
    });
  },
  onOfflineReady() {
    toast.info(t('content is cached'), {
      ...ToastDefaultConfig,
      autoClose: 4000,
      position: 'top-center',
    });
  },
  onRegisterError(error) {
    toast.error(t('cannot regist sw'), {
      ...ToastDefaultConfig,
      autoClose: 4000,
      position: 'top-center',
    });

    console.log(error);
  },
});
