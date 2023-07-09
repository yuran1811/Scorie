import { auth } from '@/shared';
import { useStore } from '@/store';
import { getFirebaseErr } from '@/utils';
import { ArrowLeftIcon, ArrowRightIcon, LogInIcon, ThreeDotsFade } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Divider, Input, RevealPasswordInput } from '@cpns/shared';
import { CreateNewUser } from './CreateNewUser';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  email: string;
  password: string;
}

const SignInUseEmailPassWord = () => {
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isNew, setNew] = useState(false);

  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    const { email, password } = data;

    setLoading(true);
    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
      })
      .catch((error) => {
        setErrMsg(getFirebaseErr(error.message));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [watch('email'), watch('password')]);

  return (
    <>
      {isNew ? (
        <CreateNewUser>
          <Divider className="!max-w-[40rem]">{t('already have account')}</Divider>
          <Button className="itypo-sm" content="Log in" onClick={() => setNew(false)}>
            <ArrowLeftIcon className="mr-6" width="32" height="32" />
          </Button>
        </CreateNewUser>
      ) : (
        <>
          {loading && (
            <div className="flexcenter h-[10rem] w-full p-6">
              <ThreeDotsFade />
            </div>
          )}

          <form
            className={`${loading ? '!hidden' : ''} flexcentercol mt-6 !justify-start`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              className="itypo-3sm !h-[68px] !border-0 !bg-[#121726] !px-16 !tracking-wider"
              name="email"
              placeholder="Email"
              defaultValue=""
              inputMode="email"
              formHandle={{
                ...register('email', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.trim().length !== 0 || 'Email cannot be empty',
                    isValid: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v.trim()) || 'Invalid email',
                  },
                }),
              }}
            />
            {errors?.email && <ErrorMessage content={errors.email.message || ''} />}

            {/* <Input
              name="password"
              placeholder="Password"
              defaultValue=""
              formHandle={{
                ...register('password', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.trim().length !== 0 || 'Password cannot be empty',
                    isValid: (v) => /^[\w\d. ]{6,}$/.test(v.trim()) || 'At least 6 characters',
                  },
                }),
              }}
            /> */}
            <RevealPasswordInput
              className="max-w-[32rem]"
              name="password"
              placeholder="Password"
              defaultValue=""
              inputValue={watch('password')}
              changeValue={reset}
              formHandle={{
                ...register('password', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.trim().length !== 0 || 'Password cannot be empty',
                    isValid: (v) => /^[\w\d. ]{6,}$/.test(v.trim()) || 'At least 6 characters',
                  },
                }),
              }}
            />
            {errors?.password && <ErrorMessage content={errors.password.message || ''} />}

            {errMsg && <ErrorMessage content={errMsg} />}

            <Button className="itypo-sm" type="submit" content="Log in">
              <LogInIcon className="mr-6" width="32" height="32" />
            </Button>
          </form>

          <Divider className="!max-w-[35rem]">{t('have no account')}</Divider>

          <Button className="itypo-sm" before={false} content="Create new account" onClick={() => setNew(true)}>
            <ArrowRightIcon className="ml-6" width="32" height="32" />
          </Button>
        </>
      )}
    </>
  );
};

export default SignInUseEmailPassWord;
