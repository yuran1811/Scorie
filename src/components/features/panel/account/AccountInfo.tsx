import { auth } from 'shared';
import { useStore } from 'store';
import { getFirebaseErr } from 'utils';
import { LogOutIcon, ThreeDotsFade } from 'components/icons';
import { Button, Input } from 'components/shared';
import { ErrorMessage } from 'components/interfaces';
import { NotVerifyEmail } from '../../auth/NotVerifyEmail';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { updateProfileData } from 'services';

interface Inputs {
	displayName: string;
	photoURL: string;
}

export const AccountInfo: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const [changePWMes, setChangePWMes] = useState({ type: 'null', message: '', timer: -1 });
	const [messageExpired, setMessageExpired] = useState(true);
	const [canChangePW, setCanChangePW] = useState(true);
	const [timeoutId, setTimeoutId] = useState<any>();
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
		try {
			if (!currentUser) return;

			const { displayName, photoURL } = data;

			setLoading(true);
			await updateProfileData(currentUser, { displayName: displayName.trim() });
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setErrMsg('Error');
		}
	}, []);

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

	return (
		<>
			{!currentUser?.emailVerified ? (
				<div className='w-full h-[80%] scrollY'>
					<NotVerifyEmail />
				</div>
			) : (
				<>
					{loading && (
						<div className='w-full flexcenter p-6 h-[10rem]'>
							<ThreeDotsFade />
						</div>
					)}
					<div
						className={`${
							loading ? '!hidden' : ''
						}  flexcentercol !justify-start mt-[0.6rem] h-[80%] p-3 pb-16 scrollY`}
					>
						<form className='mb-12' onSubmit={handleSubmit(onSubmit)}>
							<Input
								className='!text-[4rem]'
								name='displayName'
								placeholder='Profile name'
								defaultValue={currentUser.displayName || 'Guest'}
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
									content={
										errors?.displayName.type === 'required'
											? 'Please fill this field'
											: 'Not an email'
									}
								/>
							)}

							<Button type='submit' className='!text-[3.5rem]' content='Update profile' />
						</form>
						{errMsg && <ErrorMessage extraStyle='text-[3rem]' content={errMsg} />}

						<Button
							className='!text-[3.5rem]'
							before={false}
							content='Log out'
							onClick={() => signOut(auth)}
						>
							<LogOutIcon className='ml-6' width='40' height='40' />
						</Button>

						<Button
							className='!text-[3.5rem]'
							content='Change password'
							lineClamp='2'
							disabled={!canChangePW}
							onClick={() => {
								setCanChangePW(false);

								if (currentUser?.email) {
									sendPasswordResetEmail(auth, currentUser.email)
										.then(() => {
											setChangePWMes({
												type: 'success',
												message: 'Password reset email sent!',
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

						{!messageExpired && changePWMes.type === 'error' && (
							<ErrorMessage content={changePWMes.message} />
						)}
						{!messageExpired && changePWMes.type === 'success' && (
							<div className='text-[3.2rem] text-center w-full'>{changePWMes.message}</div>
						)}
					</div>
				</>
			)}
		</>
	);
};
