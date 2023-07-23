import { firebaseConfig } from '@/config';
import { BASE_URL } from '@/shared';
import getAxiosInst from '@shared/axios';

const { cloudMessagingServerKey } = firebaseConfig;

export const sendNotification = ({
  FCMToken,
  title,
  body,
  icon,
}: {
  FCMToken: string;
  title: string;
  body: string;
  icon?: string;
}) => {
  getAxiosInst({
    headers: {
      Authorization: `key=${cloudMessagingServerKey}`,
      'content-type': 'application/json',
    },
  }).post('https://fcm.googleapis.com/fcm/send', {
    notification: {
      title,
      body,
      icon,
      click_action: BASE_URL,
    },
    to: FCMToken,
  });
};
