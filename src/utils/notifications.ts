export const getNotification = (title: string, options: any) => {
  if (!('Notification' in window)) return;

  try {
    new Notification(title, options);
  } catch (error) {
    console.log(error);
  }
};
