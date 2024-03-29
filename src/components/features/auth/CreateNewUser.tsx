import { createNewUserEmailMethod, sendVerifyEmail, updateUserProfile } from '@/services';
import { useStore } from '@/store';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, InlineLoading, Input } from '@cpns/shared';
import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CreateNewInputs {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const CreateNewUser: FC<PropsWithChildren> = ({ children }) => {
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const password = useRef({});

  const {
    watch,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewInputs>();

  const onSubmit: SubmitHandler<CreateNewInputs> = useCallback(async (data) => {
    try {
      const { email, password, displayName } = data;

      setLoading(true);
      const { resp } = await createNewUserEmailMethod(email, password);
      setLoading(false);

      if (!resp || !resp?.user) return;
      const { user } = resp;

      await updateUserProfile({ ...user, displayName: displayName.trim() });
      setCurrentUser(user);

      await sendVerifyEmail(user);
    } catch (error) {
      const err = error as any;
      console.log('err: ', err);

      setLoading(false);
      // setErrMsg(getFirebaseErr(err.message));
      setErrMsg('error');
    }
  }, []);

  useEffect(() => {
    password.current = watch('password', '');
  }, [watch('password')]);

  useEffect(() => {
    return () => {
      unregister('confirmPassword');
      unregister('displayName');
      unregister('email');
      unregister('password');
    };
  }, []);

  return (
    <>
      {loading && <InlineLoading />}

      {!loading && (
        <form className={`flexcentercol mt-6 !justify-start`} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="displayName"
            placeholder="Name"
            autoComplete="username"
            defaultValue=""
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

          <Input
            name="email"
            type="email"
            inputMode="email"
            placeholder="Email"
            autoComplete="email"
            defaultValue=""
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

          <Input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
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
          />
          {errors?.password && <ErrorMessage content={errors.password.message || ''} />}

          <Input
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            defaultValue=""
            formHandle={{
              ...register('confirmPassword', {
                required: 'Please fill in this field',
                validate: (v) => v === password.current || 'The password do not match',
              }),
            }}
          />
          {errors?.confirmPassword && <ErrorMessage content={errors.confirmPassword.message || ''} />}

          {errMsg && <ErrorMessage content={errMsg} />}

          <Button type="submit" content="Create" />
        </form>
      )}

      {children}
    </>
  );
};
