import { updateUserProfile } from '@/services';
import { auth } from '@/shared';
import { useStore } from '@/store';
import { getFirebaseErr, successToast } from '@/utils';
import { NotVerifyEmail } from '@cpns/features/auth/NotVerifyEmail';
import { LogOutIcon, ThreeDotsFade } from '@cpns/icons';
import { ErrorMessage, GradientUnderline } from '@cpns/interfaces';
import { Button, Input } from '@cpns/shared';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  displayName: string;
  photoURL: string;
}

export const AccountInfo: FC = () => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const [changePWMes, setChangePWMes] = useState({ type: 'null', message: '', timer: -1 });
  const [messageExpired, setMessageExpired] = useState(true);
  const [canChangePW, setCanChangePW] = useState(true);
  const [timeoutId, setTimeoutId] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {
    reset,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { displayName, photoURL } = data;

      if (!currentUser || displayName === currentUser?.displayName) return;

      setLoading(true);
      await updateUserProfile({ ...currentUser, displayName: displayName.trim() });
      reset({ displayName, photoURL });
      setLoading(false);

      successToast();
    } catch (error) {
      setLoading(false);

      const err = error as FirebaseError;
      setErrMsg(err.message);
    }
  };

  useEffect(() => {
    setMessageExpired(false);

    clearTimeout(timeoutId);

    if (changePWMes.timer > 0)
      setTimeoutId(
        setTimeout(() => {
          setMessageExpired(true);
        }, changePWMes.timer * 1000)
      );
  }, [changePWMes]);

  useEffect(() => {
    return () => {
      unregister('displayName');
      unregister('photoURL');
    };
  }, []);

  return (
    <>
      {!currentUser?.emailVerified ? (
        <div className="scrollY h-4/5 w-full">
          <NotVerifyEmail />
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flexcenter h-[10rem] w-full p-6">
              <ThreeDotsFade />
            </div>
          ) : (
            <div className={`flexcentercol scrollY mt-[0.6rem] h-4/5 !justify-start p-3 pb-16`}>
              <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  className="!max-w-sm"
                  name="displayName"
                  placeholder="Profile name"
                  defaultValue={currentUser?.displayName || t('guest')}
                  formHandle={{
                    ...register('displayName', {
                      required: 'Please fill in this field',
                      validate: {
                        notEmpty: (v) => v.trim().length !== 0 || 'Username cannot be empty',
                        isValid: (v) => /[\w\d\s]+/.test(v.trim()) || 'Invalid username',
                      },
                    }),
                  }}
                />
                {errors?.displayName && <ErrorMessage content={errors.displayName.message || ''} />}

                <Button className="itypo-2sm" type="submit" content="Update profile" />

                <GradientUnderline />
              </form>
              {errMsg && <ErrorMessage content={errMsg} />}

              <Button
                className="itypo-2sm"
                before={false}
                content="Log out"
                onClick={() => {
                  signOut(auth);
                }}
              >
                <LogOutIcon className="ml-6" width="24" height="24" />
              </Button>

              <Button
                className="itypo-2sm"
                content="Change password"
                lineClamp="2"
                disabled={!canChangePW}
                onClick={() => {
                  setCanChangePW(false);

                  if (currentUser?.email) {
                    sendPasswordResetEmail(auth, currentUser.email)
                      .then(() => {
                        setChangePWMes({
                          type: 'success',
                          message: 'Password reset email sent',
                          timer: 5,
                        });
                      })
                      .catch((error) => {
                        setChangePWMes({
                          type: 'error',
                          message: getFirebaseErr(error.message),
                          timer: 5,
                        });
                      })
                      .finally(() => {
                        setCanChangePW(true);
                      });
                  }
                }}
              />

              {!messageExpired && changePWMes.type === 'error' && <ErrorMessage content={changePWMes.message} />}
              {!messageExpired && changePWMes.type === 'success' && (
                <div className="typo mt-4 w-full border-4 border-current text-center font-bold">{changePWMes.message}</div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
