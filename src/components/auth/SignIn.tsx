import { ErrorMessage } from 'components/interfaces';
import { ModalBox } from 'components/shared';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FC, useState } from 'react';
import { auth } from 'shared';

export const SignIn: FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isAlertOpened, setIsAlertOpened] = useState(false);

	const handleSignIn = (provider: AuthProvider) => {
		setLoading(true);

		signInWithPopup(auth, provider)
			.then((res) => {
				console.log('Sign in successful');
			})
			.catch((err) => {
				setIsAlertOpened(true);
				setError(`Error: ${err.code}`);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className='mt-12 flex flex-1 flex-col items-center gap-4 md:items-start lg:mt-24'>
				<button
					disabled={loading}
					onClick={() => handleSignIn(new GoogleAuthProvider())}
					className='flex min-w-[25rem] cursor-pointer items-center gap-3 rounded-md bg-white p-3 text-black transition duration-300 hover:brightness-90 disabled:!cursor-default disabled:!brightness-75'
				>
					<span>Sign In With Google</span>
				</button>

				<button
					disabled={loading}
					onClick={() => handleSignIn(new FacebookAuthProvider())}
					className='flex min-w-[25rem] cursor-pointer items-center gap-3 rounded-md bg-black p-3 text-white transition duration-300 hover:brightness-90 disabled:!cursor-default disabled:!brightness-75'
				>
					<span>Sign In With Facebook</span>
				</button>
			</div>

			{isAlertOpened && (
				<ModalBox onClick={() => setIsAlertOpened(false)}>
					<ErrorMessage content={error} />
				</ModalBox>
			)}
		</>
	);
};
