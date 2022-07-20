import { SettingsType } from '@shared/types';
import { ToastOptions } from 'react-toastify';

export const STORE_NAME = 'local_user_data';

export const SETTINGS_DEFAULT: SettingsType = {
  numberFormat: 2,
  showStartUpLogo: true,
};

export const QUOTES_STORED_DEFAULT = {
  data: [],
  isFetch: false,
  loading: false,
  numPage: 0,
  quoteIdx: 0,
};

export const MAX_SCORE_RECENT_LTH = 4;

export const ToastDefaultConfig: ToastOptions = {
  className: 'text-[2.4rem] text-center',
  autoClose: 1500,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
  position: 'bottom-center',
  progress: undefined,
  hideProgressBar: false,
};
