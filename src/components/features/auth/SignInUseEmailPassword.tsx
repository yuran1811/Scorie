import { auth } from '@/shared';
import { useStore } from '@/store';
import { getFirebaseErr } from '@/utils';
import { ArrowLeftIcon, ArrowRightIcon, LogInIcon, ThreeDotsFade } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input } from '@cpns/shared';
import { CreateNewUser } from './CreateNewUser';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

const SignInUseEmailPassWord = () => {
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isNew, setNew] = useState(false);

  const {
    watch,
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
          <Button className="!text-[3rem]" content="Log in" onClick={() => setNew(false)}>
            <ArrowLeftIcon className="mr-6" width="40" height="40" />
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
              name="email"
              placeholder="Email"
              defaultValue=""
              inputMode="email"
              formHandle={{
                ...register('email', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.trim().length !== 0 || 'Email cannot be empty',
                    isValid: (v) =>
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v.trim()) ||
                      'Invalid email',
                  },
                }),
              }}
            />
            {errors?.email && <ErrorMessage content={errors.email.message || ''} />}

            <Input
              name="password"
              placeholder="Password"
              defaultValue=""
              formHandle={{
                ...register('password', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.trim().length !== 0 || 'Password cannot be empty',
                    isValid: (v) => /^[\w\d]{6,}$/.test(v.trim()) || 'At least 6 characters',
                  },
                }),
              }}
            />
            {errors?.password && <ErrorMessage content={errors.password.message || ''} />}

            {errMsg && <ErrorMessage content={errMsg} />}

            <Button className="!text-[3rem]" type="submit" content="Log in">
              <LogInIcon className="mr-6" width="40" height="40" />
            </Button>
          </form>

          <Button
            before={false}
            className="!text-[3rem]"
            content="Create new account"
            onClick={() => setNew(true)}
          >
            <ArrowRightIcon className="ml-6" width="40" height="40" />
          </Button>
        </>
      )}
    </>
  );
};

export default SignInUseEmailPassWord;
