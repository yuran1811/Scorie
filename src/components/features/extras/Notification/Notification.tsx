import { getFCMToken, onMessageListener, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { getFirebaseErr, getNotification } from '@/utils';
import { NotificationIcon } from '@cpns/icons';
import { MessagePayload } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const NotificationWrapper = () => {
  const FCMToken = useStore((s) => s.FCMToken);
  const setFCMToken = useStore((s) => s.setFCMToken);

  const { t } = useTranslation();

  const [notificationActive, setNotificationActive] = useState(false);

  const notificationAction = () => {
    setNotificationActive(true);

    getFCMToken()
      .then((token) => {
        token && setFCMToken(token);

        getNotification(t('you have allowed scorie to send notification'), {
          body: t('created by scorie'),
        } as NotificationOptions);

        // setTimeout(() => {
        //   sendNotification({
        //     FCMToken,
        //     title: t('you have allowed scorie to send notification'),
        //     body: t('created by scorie'),
        //   });
        // }, 500);
      })
      .catch((err) => {
        getNotification(t('cannot regist push service'), {
          body: `Bugs description: ${getFirebaseErr(err)}`,
        } as NotificationOptions);
      });

    onMessageListener()
      .then((payload) => {
        if (!payload) return;

        const { notification } = payload as MessagePayload;
        if (!notification) return;

        const { body, image, title } = notification;

        getNotification(title || '', { body, image } as NotificationOptions);
      })
      .catch((err) => {
        getNotification(t('cannot receive notification from server'), {
          body: `Bugs description: ${getFirebaseErr(err)}`,
        } as NotificationOptions);
      });
  };

  const notificationHandle = () => {
    if (!('Notification' in window) || !('requestPermission' in Notification)) {
      toast.warn(t('this browser does not support desktop notification'), {
        ...ToastDefaultConfig,
        toastId: 'notsupport-noti',
        autoClose: 4000,
        position: 'top-center',
      });
      return;
    }

    const { permission, requestPermission } = Notification;

    if (permission === 'granted') notificationAction();
    else {
      requestPermission()
        .then((result) => {
          if (result === 'granted') notificationAction();
          else {
            toast.error(t('please enable notification on this site to use notification feature'), {
              ...ToastDefaultConfig,
              toastId: 'unenable-noti',
              autoClose: 5000,
              position: 'top-center',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const { permission } = Notification;
    setNotificationActive(permission === 'granted');

    permission === 'granted' &&
      getNotification(t('have a nice day, friends'), {
        body: t(`message from scorie`),
      });
  }, []);

  return (
    <>
      <NotificationIcon
        className="mx-6 my-4 cursor-pointer"
        active={notificationActive}
        width="30"
        height="30"
        onClick={notificationHandle}
      />
    </>
  );
};
