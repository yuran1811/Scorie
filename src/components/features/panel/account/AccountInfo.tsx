import { auth } from 'shared';
import { useStore } from 'store';
import { getFirebaseErr } from 'utils';
import { Button } from 'components/shared';
import { LogOutIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { NotVerifyEmail } from '../../auth/NotVerifyEmail';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';

export const AccountInfo: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const [changePWMes, setChangePWMes] = useState({ type: 'null', message: '', timer: -1 });
	const [messageExpired, setMessageExpired] = useState(true);
	const [canChangePW, setCanChangePW] = useState(true);
	const [timeoutId, setTimeoutId] = useState<any>();

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
				<div className='flexcentercol !justify-start mt-[0.6rem] h-[80%] p-3 pb-16 scrollY'>
					<div className='font-bold text-[5rem] text-center'>
						{currentUser ? currentUser.displayName : 'Guest'}
					</div>

					<Button className='!text-[3.5rem]' before={false} content='Log out' onClick={() => signOut(auth)}>
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

					{!messageExpired && changePWMes.type === 'error' && <ErrorMessage content={changePWMes.message} />}
					{!messageExpired && changePWMes.type === 'success' && (
						<div className='text-[3.2rem] text-center w-full'>{changePWMes.message}</div>
					)}
				</div>
			)}
		</>
	);
};