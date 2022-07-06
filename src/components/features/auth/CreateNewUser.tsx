import { useStore } from 'store';
import { ThreeDotsFade } from 'components/icons';
import { Button, Input } from 'components/shared';
import { ErrorMessage } from 'components/interfaces';
import { createNewUserEmailMethod, sendVerifyEmail, updateProfileData } from 'services';
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

			await updateProfileData(user, { displayName: displayName.trim() });
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
				<div className='w-full flexcenter p-6 h-[10rem]'>
					<ThreeDotsFade />
				</div>
			)}

			<form
				className={`${loading ? '!hidden' : ''} flexcentercol !justify-start mt-6`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					name='displayName'
					placeholder='Name'
					defaultValue=''
					formHandle={{
						...register('displayName', {
							required: true,
							pattern: /[\w\d\s]+/,
							validate: (value) => value.trim().length !== 0,
						}),
					}}
				/>
				{errors?.displayName && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.displayName.type === 'required' ? 'Please fill this field' : 'Invalid name'}
					/>
				)}

				<Input
					name='email'
					placeholder='Email'
					defaultValue=''
					formHandle={{
						...register('email', {
							required: true,
							pattern: /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/,
							validate: (value) => value.trim().length !== 0,
						}),
					}}
				/>
				{errors?.email && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.email.type === 'required' ? 'Please fill this field' : 'Not an email'}
					/>
				)}

				<Input
					name='password'
					placeholder='Password'
					defaultValue=''
					formHandle={{ ...register('password', { required: true, pattern: /[\w\d]{6,}/ }) }}
				/>
				{errors?.password && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={
							errors?.password.type === 'required' ? 'Please fill this field' : 'At least 6 characters'
						}
					/>
				)}

				<Input
					placeholder='Confirm password'
					defaultValue=''
					formHandle={{
						...register('confirmPassword', {
							required: true,
							validate: (value) => value === password.current || 'The passwords do not match',
						}),
					}}
				/>
				{errors?.confirmPassword && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={
							errors?.confirmPassword.type === 'required'
								? 'Please fill this field'
								: errors.confirmPassword.message || ''
						}
					/>
				)}

				{errMsg && <ErrorMessage extraStyle='text-[3rem]' content={errMsg} />}

				<Button className='!text-[3rem]' type='submit' content='Create' />
			</form>

			{children}
		</>
	);
};
