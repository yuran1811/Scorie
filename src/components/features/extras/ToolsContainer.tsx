import { sendNotification } from '@/services';
import { getFCMToken, onMessageListener, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { getFirebaseErr, getNotification } from '@/utils';
import { CloudCheckIcon, EnLocale, NotificationIcon, ViLocale } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { MessagePayload } from 'firebase/messaging';
import i18next from 'i18next';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

interface ToolsContainerProps {
  showMore: boolean;
}

export const ToolsContainer: FC<ToolsContainerProps> = ({ showMore, ...otherPropss }) => {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);
  const FCMToken = useStore((s) => s.FCMToken);
  const setFCMToken = useStore((s) => s.setFCMToken);

  const [notificationActive, setNotificationActive] = useState(false);

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    setLocale(lang);
  };

  const notificationHandle = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    const { permission } = Notification;

    if (permission === 'granted') {
      setNotificationActive(true);

      getFCMToken()
        .then((token) => {
          token && setFCMToken(token);
          setTimeout(() => {
            sendNotification({
              FCMToken,
              title: 'You have allowed Scorie to send notification !',
              body: 'Created by Scorie',
            });
          }, 500);
        })
        .catch((err) => {
          console.log(getFirebaseErr(err));
        });

      onMessageListener()
        .then((payload) => {
          if (!payload) return;

          const { notification } = payload as MessagePayload;
          if (!notification) return;

          const { body, image, title } = notification;

          getNotification(title || '', { body, image } as NotificationOptions);
        })
        .catch((err) => console.log('failed: ', err));
    }

    if (permission === 'denied') {
      setNotificationActive(false);

      toast.error('Please enable notification on this site to use notification feature !', {
        ...ToastDefaultConfig,
        toastId: 'unenable-noti',
        autoClose: 5000,
        position: 'top-center',
      });
    }
  };

  return (
    <div
      {...otherPropss}
      className={`${
        showMore ? 'flex' : 'hidden'
      } flex-col items-center justify-start absolute right-[1rem] top-[9rem] bg-ctbg rounded-[1.5rem] border-indigo-200 border-l-[0.5rem] border-b-[0.5rem]`}
    >
      <Tooltip content="Turn on/off notification">
        <NotificationIcon
          className="cursor-pointer my-4 mx-6"
          active={notificationActive}
          width="40"
          height="40"
          onClick={notificationHandle}
        />
      </Tooltip>

      <Tooltip content="Sync status">
        <CloudCheckIcon className="cursor-pointer my-4 mx-6" width="40" height="40" />
      </Tooltip>

      <Tooltip content="Change language">
        {locale === 'en' ? (
          <ViLocale
            className="cursor-pointer my-4 mx-6"
            width="40"
            height="40"
            onClick={() => changeLanguage('vi')}
          />
        ) : (
          <EnLocale
            className="cursor-pointer my-4 mx-6"
            width="40"
            height="40"
            onClick={() => changeLanguage('en')}
          />
        )}
      </Tooltip>
    </div>
  );
};
