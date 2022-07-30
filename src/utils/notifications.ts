export const getNotification = (title: string, options: any) => {
  if (!('Notification' in window)) return;
  new Notification(title, options);
};
