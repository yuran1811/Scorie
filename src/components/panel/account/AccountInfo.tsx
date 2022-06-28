import { NotVerifyEmail } from 'components/auth/NotVerifyEmail';
import { LogOutIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button } from 'components/shared';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { FC, useCallback, useEffect, useState } from 'react';
import { auth } from 'shared';
import { useStore } from 'store';
import { getFirebaseErr } from 'utils';

export interface AccountInfoInputs {
	email: string;
	password: string;
}

export const AccountInfo: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const [timeoutId, setTimeoutId] = useState<any>();
	const [canChangePW, setCanChangePW] = useState(true);
	const [messageExpired, setMessageExpired] = useState(true);
	const [changePWMes, setChangePWMes] = useState({
		type: 'null',
		message: '',
		timer: -1,
	});

	useEffect(() => {
		setMessageExpired(false);

		clearTimeout(timeoutId);

		if (changePWMes.timer > 0)
			setTimeoutId(
				setTimeout(() => {
					console.log('Set time out');
					setMessageExpired(true);
				}, changePWMes.timer * 1000)
			);
	}, [changePWMes]);

	return (
		<>
			{!currentUser?.emailVerified ? (
				<div className='w-full h-[80%] overflow-x-hidden overflow-y-auto'>
					<NotVerifyEmail />
				</div>
			) : (
				<div className='flexcentercol !justify-start mt-[2rem] h-[80%] p-3 pb-16 overflow-x-hidden overflow-y-auto'>
					<div className='font-bold text-[5rem]'>{currentUser ? currentUser.displayName : 'Guest'}</div>

					<Button className='!text-[3.5rem]' before={false} content='Log out' onClick={() => signOut(auth)}>
						<LogOutIcon className='ml-6' width='40' height='40' />
					</Button>

					<Button
						className='!text-[3.5rem]'
						content='Change password'
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