import { TranslationType } from '@shared/types';

const accountTranslation = {
  account: {
    vi: 'Tài khoản',
    en: 'Account',
  },
  'have no account': {
    vi: 'Không có tài khoản ?',
    en: 'Have no account ?',
  },
  'already have account': {
    vi: 'Đã có tài khoản ?',
    en: 'Already have account ?',
  },
  'change password': {
    vi: 'Đổi mật khẩu',
    en: 'Change password',
  },
  email: {
    vi: 'Địa chỉ mail',
    en: 'Email',
  },
  password: {
    vi: 'Mật khẩu',
    en: 'Password',
  },
  'confirm password': {
    vi: 'Xác nhận mật khẩu',
    en: 'Confirm password',
  },
  'profile name': {
    vi: 'Tên người dùng',
    en: 'Profile name',
  },
};

const dataTranslation = {
  data: {
    vi: 'Dữ liệu',
    en: 'Data',
  },
  import: {
    vi: 'Nhập dữ liệu',
    en: 'Import',
  },
  export: {
    vi: 'Xuất dữ liệu',
    en: 'Export',
  },
  'get backup data': {
    vi: 'Tải dữ liệu',
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
  'num recent score record': {
    vi: 'Số bản ghi điểm gần đây',
    en: 'Number of recent score record',
  },
  'show startup logo': {
    vi: 'Hiện logo khi khởi động',
    en: 'Show startup logo',
  },
  'hide startup logo': {
    vi: 'Ẩn logo khi khởi động',
    en: 'Hide startup logo',
  },
  'turn on blur effect': {
    vi: 'Bật hiệu ứng mờ',
    en: 'Turn on `Blur Effect`',
  },
  'turn off blur effect': {
    vi: 'Tắt hiệu ứng mờ',
    en: 'Turn off `Blur Effect`',
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
