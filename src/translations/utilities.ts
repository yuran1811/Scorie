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
  'wrong password': {
    vi: 'Sai mật khẩu',
    en: 'Wrong password',
  },
  'an error has occured': {
    vi: 'Có lỗi gì đó rồi',
    en: 'An error has occured',
  },
};

const formValidateTranslation = {
  'please fill in this field': {
    vi: 'Vui lòng điền vào trường này',
    en: 'Please fill in this field',
  },
  'username cannot be empty': {
    vi: 'Tên người dùng không được để trống',
    en: 'Username cannot be empty',
  },
  'email cannot be empty': {
    vi: 'Email không được để trống',
    en: 'Email cannot be empty',
  },
  'password cannot be empty': {
    vi: 'Mật khẩu không được để trống',
    en: 'Password cannot be empty',
  },
  'invalid username': {
    vi: 'Tên người dùng không hợp lệ (chỉ được chứa chữ cái, số, và một số kí tự khác)',
    en: 'Invalid username (include "a-z, A-Z, 0-9, and others valid characters")',
  },
  'invalid email': {
    vi: 'Email không hợp lệ',
    en: 'Invalid email',
  },
  'invalid subject': {
    vi: 'Tên môn học không hợp lệ (chỉ được chứa chữ cái, số, và một số kí tự khác)',
    en: 'Invalid subject (include "a-z, A-Z, 0-9, and others valid characters")',
  },
  'invalid score': {
    vi: 'Điểm phải là một số (9 hoặc 9.xxx)',
    en: 'Invalid score (must be a number)',
  },
  'invalid base': {
    vi: 'Hệ cơ số phải là một số',
    en: 'Invalid base (must be a number)',
  },
  'invalid type': {
    vi: 'Thể loại của điểm không hợp lệ (chỉ được chứa chữ cái, số, và một số kí tự khác)',
    en: 'Invalid type (include "a-z, A-Z, 0-9, and others valid characters")',
  },
  'not a number': {
    vi: 'Vui lòng điền số vào',
    en: 'Not a number',
  },
  'at least 6 characters': {
    vi: 'Mật khẩu phải có ít nhất 6 kí tự',
    en: 'At least 6 characters',
  },
  'the password do not match': {
    vi: 'Mật khẩu không trùng khớp',
    en: 'The password do not match',
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
  'the app is running offline, any changes mades during this time will be synced as soon as the connectivity is back': {
    vi: 'Ứng dụng đang hoạt động ngoại tuyến, bất kì sự thay đổi dữ liệu nào trong suốt quá trình này đều sẽ được đồng bộ sớm nhất có thể khi trở lại trực tuyến',
    en: 'The app is running offline, any changes mades during this time will be synced as soon as the connectivity is back',
  },
};

const testimonialTranslation = {
  'what users think': {
    vi: 'Người dùng nghĩ gì',
    en: 'What users think',
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
    vi: 'Không có môn học nào ở đây hết',
    en: 'No subject',
  },
  'no record': {
    vi: 'Không có bản ghi nào ở đây hết',
    en: 'No record',
  },

  'log in required': {
    vi: 'Vui lòng đăng nhập để dùng tính năng này nhóe',
    en: 'Please log in to use this feature',
  },
  'subject cannot be both ignored and vital (or special)': {
    vi: 'Môn học không thể vừa bị bỏ qua và vừa quan trọng (hoặc chuyên / đặc biệt)',
    en: 'Subject cannot be both ignored and vital (or special)',
  },
  'fail to update': {
    vi: 'Lỗi trong quá trình cập nhật',
    en: 'Fail to update',
  },

  'email verification sent': {
    vi: 'Đã gửi mail xác thực !',
    en: 'Email verification sent !',
  },
  'cannot send email verification': {
    vi: 'Không thể gửi mail xác thực !',
    en: 'Cannot send email verification !',
  },
  'password reset email sent': {
    vi: 'Đã gửi mail đổi mật khẩu !',
    en: 'Password reset email sent !',
  },

  'please verify your email before using this app': {
    vi: 'Vui lòng xác thực tài khoản trước khi sử dụng ứng dụng',
    en: 'Please verify your email before using this app',
  },
  "we've sent you a verify link via email": {
    vi: 'Chúng tôi đã gửi mail cho bạn đường dẫn để xác thực ứng dụng',
    en: "We've sent you a verify link via email",
  },
  'please refresh the app/page after verifying': {
    vi: 'Hãy khởi động lại ứng dụng sau khi xác thực',
    en: 'Please refresh the app/page after verifying',
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
  'message from scorie': {
    vi: 'Tin nhắn từ Scorie',
    en: 'Message from Scorie',
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
  'have a nice day, friends': {
    vi: 'Chúc các bạn một ngày tốt lành !',
    en: 'Have a nice day, Friends !',
  },
  'cannot regist push service': {
    vi: 'Không dùng được tính năng thông báo mất rồi',
    en: 'Cannot regist push service',
  },
  'cannot receive notification from server': {
    vi: 'Ây da, không nhận được thông báo từ hệ thống rồi',
    en: 'Cannot receive notification from server',
  },
};

const chartTranslation = {
  expected: {
    vi: 'Điểm cần',
    en: 'Expected',
  },
  'average score': {
    vi: 'Điểm trung bình',
    en: 'Average score',
  },
  'average score short': {
    vi: 'Điểm TB',
    en: 'Average score',
  },
  'bar chart': {
    vi: 'Biểu đồ cột',
    en: 'Bar Chart',
  },
  'polar chart': {
    vi: 'Biểu đồ cực',
    en: 'Polar Chart',
  },
  'polararea chart': {
    vi: 'Biểu đồ cực',
    en: 'Polar Chart',
  },
  'radar chart': {
    vi: 'Biểu đồ radar',
    en: 'Radar Chart',
  },

  'click on the label to see the following chart': {
    vi: 'Chọn tên biểu đồ để xem biểu đồ tương ứng',
    en: 'Click on the label to see the following chart',
  },
};

const pwaFunc = {
  'scorie - a product of yuran1811': {
    vi: 'Scorie - Một sản phẩm của yuran1811',
    en: 'Scorie - A product of yuran1811',
  },
  'discover scorie - a modern web app for better school life : ': {
    vi: 'Khám phá Scorie - Ứng dụng hiện đại & miễn phí tăng trải nghiệm học tập: ',
    en: 'Discover Scorie - A modern & free web app for better school life : ',
  },
};

export default {
  ...confirmTranslation,
  ...errorTranslation,
  ...formValidateTranslation,
  ...notificationTranslation,
  ...scoreLevelTranslation,
  ...statusTranslation,
  ...testimonialTranslation,
  ...workerTranslation,
  ...chartTranslation,
  ...pwaFunc,

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
    vi: 'Cập nhật hồ sơ',
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
  'click to change': {
    vi: 'Nhấp để đổi',
    en: 'Click to change',
  },
  open: {
    vi: 'Mở',
    en: 'Open',
  },
  minimize: {
    vi: 'Thu nhỏ',
    en: 'Minimize',
  },
  maximize: {
    vi: 'Phóng to',
    en: 'Maximize',
  },
  share: {
    vi: 'Chia sẻ',
    en: 'Share',
  },
  or: {
    vi: 'hoặc',
    en: 'or',
  },
  amount: {
    vi: 'Số lượng',
    en: 'Amount',
  },

  title: {
    vi: 'Tiêu đề',
    en: 'Title',
  },
  content: {
    vi: 'Nội dung',
    en: 'Content',
  },
  name: {
    vi: 'Tên của bạn',
    en: 'Name',
  },
  job: {
    vi: 'Nghề nghiệp của bạn',
    en: 'Job',
  },
  'type a number': {
    vi: 'Điền số',
    en: 'Type a number',
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
  'max score': {
    vi: 'Thang điểm',
    en: 'Grade scale',
  },

  'report bugs': {
    vi: 'Báo cáo lỗi',
    en: 'Report bugs',
  },

  'add scores and the chart will be shown': {
    vi: 'Thêm điểm thì mới coi được biểu đồ nha !',
    en: 'Add scores and the chart will be shown !',
  },
  'add scores': {
    vi: 'Thêm điểm ngay',
    en: 'Add scores now',
  },

  'paste your shared content here': {
    vi: 'Dán nội dung được chia sẻ tại đây!',
    en: 'Paste your shared content here!',
  },

  'ideal place to keep your mind on': {
    vi: 'Quá nhiều ý tưởng? Lưu giữ ngay!',
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
    vi: 'Công cụ giúp ích trong quá trình học tập',
    en: 'Helpful tools make school life be better',
  },
} as TranslationType;
