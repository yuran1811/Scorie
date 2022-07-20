import { auth, ToastDefaultConfig } from '@/shared';
import { getFirebaseErr } from '@/utils';
import { sendEmailVerification } from 'firebase/auth';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const NotVerifyEmail: FC = () => {
  const [canResend, setCanResend] = useState(true);

  const { t } = useTranslation();

  const reVerifyEmail = useCallback(
    (canResend: boolean, setCanResend: Dispatch<SetStateAction<boolean>>) => {
      if (!canResend || !auth.currentUser) return;

      setCanResend(false);

      sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success(t('email verification sent'), {
            ...ToastDefaultConfig,
            position: 'top-center',
          });
        })
        .catch((err) => {
          toast.error(t('cannot send email verification'), {
            ...ToastDefaultConfig,
            position: 'top-center',
          });
          console.log(getFirebaseErr(err.message));
        })
        .finally(() => {
          setCanResend(true);
        });
    },
    []
  );

  return (
    <div className="p-4 mobile:p-10 m-6">
      <div className="font-semibold text-[4rem] text-center">
        {t('please verify your email before using this app')}
      </div>
      <div className="text-[3rem] text-center w-full mobile:w-[80%] mx-auto mt-10">
        {t("we've sent you a verify link via email")}
      </div>
      <div className="text-[3rem] text-center w-full mobile:w-[80%] mx-auto mt-10">
        {t('please check all your mails carefully (our mail can be in spam by many reasons)')}
      </div>
      <div className="text-[3rem] text-center w-full mobile:w-[80%] mx-auto mt-10">
        {t("or if you can't find any")},{' '}
        <span
          className="cursor-pointer font-semibold underline"
          onClick={() => reVerifyEmail(canResend, setCanResend)}
        >
          {t('click here and check your mail again')}
        </span>
      </div>
    </div>
  );
};
