import { firebaseConfig } from '@/config';
import getAxiosInst from '@shared/axios';
import { DEPLOY_URL, HOST_URL } from '@shared/constants';

const { webPushCertificate } = firebaseConfig;

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
      Authorization: `key=${webPushCertificate}`,
      'content-type': 'application/json',
    },
  }).post('https://fcm.googleapis.com/fcm/send', {
    notification: {
      title,
      body,
      icon,
      click_action: process.env.NODE_ENV === 'production' ? DEPLOY_URL : HOST_URL,
    },
    to: FCMToken,
  });
};
