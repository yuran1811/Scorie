import { auth } from 'shared';
import { getFirebaseErr } from 'utils';
import { sendEmailVerification } from 'firebase/auth';
import { Dispatch, FC, SetStateAction, useState } from 'react';

const reVerifyEmail = (canResend: boolean, setCanResend: Dispatch<SetStateAction<boolean>>) => {
	if (!canResend || !auth.currentUser) return;

	setCanResend(false);

	sendEmailVerification(auth.currentUser)
		.then(() => {
			console.log('Email verification sent !');
		})
		.catch((err) => {
			console.log('Cannot send email verification !');
			console.log(getFirebaseErr(err.message));
		})
		.finally(() => {
			setCanResend(true);
		});
};

export const NotVerifyEmail: FC = () => {
	const [canResend, setCanResend] = useState(true);

	return (
		<div className='p-4 mobile:p-10 m-6'>
			<div className='font-semibold text-[4rem] text-center'>Please verify your email before using this app</div>
			<div className='text-[3rem] text-center w-full mobile:w-[80%] mx-auto mt-10'>
				We've sent you a verify link via email
			</div>
			<div className='text-[3rem] text-center w-full mobile:w-[80%] mx-auto mt-2'>
				Please check all your mails carefully (our mail can be in spam by many reasons)
			</div>
			<div className='text-[3rem] text-center w-full mobile:w-[80%] mx-auto mt-10'>
				Or if you can't find any,{' '}
				<span
					className='cursor-pointer font-semibold underline'
					onClick={() => reVerifyEmail(canResend, setCanResend)}
				>
					click here and check your mail again
				</span>
			</div>
		</div>
	);
};
