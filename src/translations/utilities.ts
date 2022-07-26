import { TranslationType } from '@shared/types';

const confirmTranslation = {
  'confirm delete subject': {
    vi: 'Xác nhận xóa môn học này (bao gồm tất cả điểm) ?',
    en: 'This action will delete this subjects (include all score records). Continue ?',
  },
  'confirm delete score': {
    vi: 'Xác nhận xóa điểm này ?',
    en: 'This action will delete this score record. Continue ?',
  },
  'confirm delete note': {
    vi: 'Xác nhận xóa note này ?',
    en: 'This action will delete this note. Continue ?',
  },
  'default confirm': {
    vi: 'Xác nhận ?',
    en: 'Confirm action ?',
  },
  'delete action': {
    vi: 'Hành động xóa',
    en: 'Delete action',
  },
  'this will delete your feedback': {
    vi: 'Xác nhận xóa phản hồi ứng dụng',
    en: 'This will delete your feedback',
  },
};

const scoreLevelTranslation = {
  excellent: {
    vi: 'Xuất sắc',
    en: 'Excellent',
  },
  good: {
    vi: 'Giỏi',
    en: 'Good',
  },
  normal: {
    vi: 'Bình thường',
    en: 'Normal',
  },
  caution: {
    vi: 'Cẩn trọng',
    en: 'Caution',
  },
  danger: {
    vi: 'Nguy hiểm',
    en: 'Danger',
  },
};

const errorTranslation = {
  'cannot sign in': {
    vi: 'Không đăng nhập được. Thử lại nào!',
    en: 'We cannot sign in to your account. Please try again !',
  },
  oops: {
    vi: 'Úi!',
    en: 'Oops!',
  },
  'something went wrong': {
    vi: 'Có gì đó sai sai rồi á!',
    en: 'Something went wrong!',
  },
};

const workerTranslation = {
  'the connectivity is back, sync in progress': {
    vi: 'Kết nối mạng đã trở lại, đang đồng bộ...',
    en: 'The connectivity is back, sync in progress...',
  },
  'new content is available': {
    vi: 'App được cập nhật rồi nhé! Xóa bộ đệm và tải lại trang (hoặc Ctrl + F5) thôi nào!',
    en: 'New content is available! Hard reload (or Ctrl + F5) to get the latest changes!',
  },
  'content is cached': {
    vi: '🚀 Ứng dụng đã sẵn sàng để sử dụng offline rồi đó',
    en: '🚀 Content is cached for offline use.',
  },
  'cannot regist sw': {
    vi: 'Không thể đăng kí service workers để tải về ứng dụng. Vui lòng tải lại trang!',
    en: 'Cannot regist service workers. Reload and try again!',
  },
};

const testimonialTranslation = {
  'what our customers are saying about us': {
    vi: 'Người dùng nói gì về chúng tôi',
    en: 'What our customers are saying about us',
  },
};

const statusTranslation = {
  successfully: {
    vi: 'Hoàn tất !',
    en: 'Successfully !',
  },
  'copy to clipboard': {
    vi: 'Note có thể đem đi share được rồi !',
    en: 'Copy to clipboard !',
  },

  'no note': {
    vi: 'Không có note nào ở đây hết',
    en: 'No note',
  },
  'no subject': {
    vi: 'Không có môn học nào được lưu điểm cả',
    en: 'No subject',
  },

  'log in required': {
    vi: 'Vui lòng đăng nhập để dùng tính năng này nhóe',
    en: 'Please log in to use this feature',
  },

  'email verification sent': {
    vi: 'Đã gửi mail xác thực !',
    en: 'Email verification sent !',
  },
  'cannot send email verification': {
    vi: 'Không thể gửi mail xác thực !',
    en: 'Cannot send email verification !',
  },

  'please verify your email before using this app': {
    vi: 'Vui lòng xác thực tài khoản trước khi sử dụng ứng dụng',
    en: 'Please verify your email before using this app',
  },
  "we've sent you a verify link via email": {
    vi: 'Chúng tôi đã gửi mail cho bạn đường dẫn để xác thực ứng dụng',
    en: "We've sent you a verify link via email",
  },
  'please check all your mails carefully (our mail can be in spam by many reasons)': {
    vi: 'Hãy kiểm tra thật kĩ gmail của bạn (vì một số lí do, mail của chúng tôi có thể đã bị đánh dấu là spam)',
    en: 'Please check all your mails carefully (our mail can be in spam by many reasons)',
  },
  "or if you can't find any": {
    vi: 'Nếu không thể tìm thấy',
    en: "Or if you can't find any",
  },
  'click here and check your mail again': {
    vi: 'bấm vào đây và kiểm tra lại gmail của bạn',
    en: 'click here and check your mail again',
  },
};

const notificationTranslation = {
  'created by scorie': {
    vi: 'Được tạo bởi Scorie',
    en: 'Created by Scorie',
  },
  'you have allowed scorie to send notification': {
    vi: 'Bạn đã cấp quyền gửi thông báo cho Scorie',
    en: 'You have allowed Scorie to send notification !',
  },
  'this browser does not support desktop notification': {
    vi: 'Trình duyệt không hỗ trợ tính năng thông báo',
    en: 'This browser does not support desktop notification',
  },
  'please enable notification on this site to use notification feature': {
    vi: 'Vui lòng cho phép quyền thông báo để nhận tin tức mới nhất từ Scorie !',
    en: 'Please enable notification on this site to use notification feature !',
  },
};

export default {
  ...confirmTranslation,
  ...errorTranslation,
  ...notificationTranslation,
  ...scoreLevelTranslation,
  ...statusTranslation,
  ...workerTranslation,
  ...testimonialTranslation,

  'sign in with': {
    vi: 'Đăng nhập với',
    en: 'Sign in with',
  },
  'log in': {
    vi: 'Đăng nhập',
    en: 'Log in',
  },
  'log out': {
    vi: 'Đăng xuất',
    en: 'Log out',
  },
  'create new account': {
    vi: 'Tạo tài khoản',
    en: 'Create new account',
  },
  add: {
    vi: 'Thêm',
    en: 'Add',
  },
  create: {
    vi: 'Tạo mới',
    en: 'Create',
  },
  update: {
    vi: 'Cập nhật',
    en: 'Update',
  },
  'update profile': {
    vi: 'Cập nhật tài khoản',
    en: 'Update profile',
  },
  change: {
    vi: 'Đổi',
    en: 'Change',
  },
  send: {
    vi: 'Gửi',
    en: 'Send',
  },
  'change password': {
    vi: 'Đổi mật khẩu',
    en: 'Change password',
  },
  'click to change': {
    vi: 'Nhấp để đổi',
    en: 'Click to change',
  },

  title: {
    vi: 'Tiêu đề',
    en: 'Title',
  },
  content: {
    vi: 'Nội dung',
    en: 'Content',
  },
  job: {
    vi: 'Nghề nghiệp của bạn',
    en: 'Job',
  },
  name: {
    vi: 'Tên của bạn',
    en: 'Name',
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

  note: {
    vi: 'Ghi chú',
    en: 'Note',
  },
  score: {
    vi: 'Điểm số',
    en: 'Score',
  },
  analytics: {
    vi: 'Phân tích',
    en: 'Analytics',
  },
  tools: {
    vi: 'Công cụ',
    en: 'Tools',
  },

  pinned: {
    vi: 'Ghim',
    en: 'Pinned',
  },
  others: {
    vi: 'Khác',
    en: 'Others',
  },
  subject: {
    vi: 'Môn học',
    en: 'Subject',
  },
  base: {
    vi: 'Hệ số',
    en: 'Base',
  },
  type: {
    vi: 'Loại / Nhãn',
    en: 'Type',
  },
  recent: {
    vi: 'Gần đây',
    en: 'Recent',
  },
  'expected score': {
    vi: 'Điểm cần',
    en: 'Expected score',
  },

  'add scores and the chart will be shown': {
    vi: 'Thêm điểm thì mới coi được biểu đồ nha !',
    en: 'Add scores and the chart will be shown !',
  },
  'add scores': {
    vi: 'Thêm điểm ngay',
    en: 'Add scores now',
  },

  'ideal place to keep your mind on': {
    vi: 'Quá nhiều ý tưởng trong đầu? Giữ chúng tại đây!',
    en: 'Ideal place to keep your mind on',
  },
  'manage all your score records': {
    vi: 'Quản lí điểm số của bạn một cách dễ dàng',
    en: 'Manage all your score records',
  },
  'variant useful charts': {
    vi: 'Biểu đồ về điểm số',
    en: 'Variant useful charts',
  },
  'helpful tools make school life be better': {
    vi: 'Công cụ giúp ích cho bạn trong quá trình học tập',
    en: 'Helpful tools make school life be better',
  },
} as TranslationType;
