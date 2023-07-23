import { ToastDefaultConfig } from '@/shared';
import { t } from 'i18next';
import { toast } from 'react-toastify';

export const successToast = () =>
  toast.success(t('successfully'), {
    ...ToastDefaultConfig,
    autoClose: 800,
  });

export const copySuccessToast = () =>
  toast.success(t('copy to clipboard'), {
    ...ToastDefaultConfig,
    toastId: 'copy-success',
  });
