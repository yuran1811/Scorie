import { TranslationType } from '@shared/types';

const accountTranslation = {
  account: {
    vi: 'Tài khoản',
    en: 'Account',
  },
};

const dataTranslation = {
  data: {
    vi: 'Dữ liệu',
    en: 'Data',
  },
  'get backup data': {
    vi: 'Tải về dữ liệu',
    en: 'Get backup data',
  },
  'import data from backup file': {
    vi: 'Nhập dữ liệu từ file',
    en: 'Import data from backup file',
  },
};

const settingTranslation = {
  settings: {
    vi: 'Cài đặt',
    en: 'Settings',
  },
  'score format': {
    vi: 'Định dạng điểm',
    en: 'Score format',
  },
  'show startup logo': {
    vi: 'Hiện logo khi khởi động',
    en: 'Show startup logo',
  },
  'hide startup logo': {
    vi: 'Ẩn logo khi khởi động',
    en: 'Hide startup logo',
  },
};

const documentTranslation = {
  document: {
    vi: 'Tài liệu',
    en: 'Document',
  },
};

export default {
  ...accountTranslation,
  ...dataTranslation,
  ...settingTranslation,
  ...documentTranslation,
} as TranslationType;
