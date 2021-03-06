import { createNewUserEmailMethod, sendVerifyEmail, updateUserProfile } from '@/services';
import { useStore } from '@/store';
import { ThreeDotsFade } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input } from '@cpns/shared';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CreateNewInputs {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const CreateNewUser: FC = ({ children }) => {
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const password = useRef({});

  const {
    watch,
    register,
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
      setLoading(false);
      setErrMsg('Error');
    }
  }, []);

  useEffect(() => {
    password.current = watch('password', '');
  }, [watch('password')]);

  return (
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
          name="displayName"
          placeholder="Name"
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
          placeholder="Email"
          defaultValue=""
          inputMode="email"
          formHandle={{
            ...register('email', {
              required: 'Please fill in this field',
              validate: {
                notEmpty: (v) => v.trim().length !== 0 || 'Email cannot be empty',
                isValid: (v) =>
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v.trim()) || 'Invalid email',
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

        <Input
          placeholder="Confirm password"
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

        <Button className="!text-[3rem]" type="submit" content="Create" />
      </form>

      {children}
    </>
  );
};
