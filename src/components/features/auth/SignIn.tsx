import { auth } from 'shared';
import { getFirebaseErr } from 'utils';
import { LogInButton } from './LogInButton';
import { ErrorMessage } from 'components/interfaces';
import { FacebookIcon, GoogleIcon } from 'components/icons';
import { ModalBox, ModalBoxHeader } from 'components/shared';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FC, useState } from 'react';

export const SignIn: FC = () => {
	const [isAlertOpened, setIsAlertOpened] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSignIn = (provider: AuthProvider) => {
		setLoading(true);

		signInWithPopup(auth, provider)
			.then((res) => {
				console.log('Sign in successful');
			})
			.catch((err) => {
				setIsAlertOpened(true);
				setError(getFirebaseErr(err.message));
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className='flex flex-1 flex-col items-center gap-4 mt-20 mb-16'>
				<LogInButton
					extraStyle='bg-slate-900 text-white'
					disabled={loading}
					onClick={() => handleSignIn(new GoogleAuthProvider())}
				>
					<GoogleIcon width='35' height='35' />
					<span className='font-semibold px-4'>Sign in with Google</span>
				</LogInButton>

				<LogInButton
					extraStyle='bg-blue-600 text-white'
					disabled={loading}
					onClick={() => handleSignIn(new FacebookAuthProvider())}
				>
					<FacebookIcon width='35' height='35' />
					<span className='font-semibold px-4'>Sign in with Facebook</span>
				</LogInButton>
			</div>

			{isAlertOpened && (
				<ModalBox onClick={() => setIsAlertOpened(false)}>
					<ModalBoxHeader onClick={() => setIsAlertOpened(false)} />
					
					<ErrorMessage
						extraStyle='text-[3rem] px-8 pb-10'
						content='We cannot sign in to your account. Please try again !'
					/>
					<ErrorMessage extraStyle='text-[3rem] px-8 pb-10' content={error} />
				</ModalBox>
			)}
		</>
	);
};
