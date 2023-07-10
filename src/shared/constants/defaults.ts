import { SettingsType } from '@shared/types';
import { ToastOptions } from 'react-toastify';

const MAX_SCORE_RECENT_LTH = 5;
const GLASSMORPHISM_DESIGN = false;

export const SETTINGS_DEFAULT: SettingsType = {
  glassmorphismDesign: GLASSMORPHISM_DESIGN,
  maxRecentScoreNum: MAX_SCORE_RECENT_LTH,
  numberFormat: 2,
  showQuickSetting: true,
  showStartUpLogo: true,
};

export const QUOTES_STORED_DEFAULT = {
  data: [],
  isFetch: false,
  loading: false,
  numPage: 0,
  quoteIdx: 0,
};

export const ToastDefaultConfig: ToastOptions = {
  className: 'text-[2.3rem] text-center',
  autoClose: 1500,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
  position: 'bottom-center',
  progress: undefined,
  hideProgressBar: false,
};
