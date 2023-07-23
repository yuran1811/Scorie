import { ToastDefaultConfig } from '@/shared';
import { t } from 'i18next';
import { toast } from 'react-toastify';

export const sharingHandle = async () => {
  const shareData = {
    url: 'https://scorie.vercel.app',
    title: t('scorie - a product of yuran1811'),
    text: t('discover scorie - a modern web app for better school life : '),
  };

  if (!('share' in navigator) || !navigator.canShare(shareData)) {
    toast.error('Web Share API is not compatible || Cannot share the data', {
      ...ToastDefaultConfig,
      toastId: 'share-error',
    });
    return;
  }

  try {
    await navigator.share(shareData);
    console.log('Content shared!');
  } catch (error) {
    console.log('Content was not shared by the user');
  }
};
