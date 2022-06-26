import { LogInIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input } from 'components/shared';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AccountPanelInputs {
	email: string;
	password: string;
}

const SignInUseEmailPassWord = () => {
	const [errMsg, setErrMsg] = useState('');

	const auth = getAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountPanelInputs>();

	const onSubmit: SubmitHandler<AccountPanelInputs> = useCallback((data) => {
		const { email, password } = data;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				setErrMsg(errorMessage);
			});
	}, []);

	return (
		<form
			className='flexcentercol !justify-start h-[80%] pb-8 mt-[2rem] overflow-x-hidden overflow-y-auto'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				placeholder='Email'
				defaultValue=''
				formHandle={{
					...register('email', {
						required: true,
						pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
				placeholder='Password'
				defaultValue=''
				formHandle={{ ...register('password', { required: true, pattern: /^[\d\w]{6,}$/ }) }}
			/>
			{errors?.password && (
				<ErrorMessage
					extraStyle='text-[3rem]'
					content={errors?.password.type === 'required' ? 'Please fill this field' : 'At least 6 characters'}
				/>
			)}

			{errMsg && <ErrorMessage extraStyle='text-[3rem]' content={errMsg} />}

			<Button type='submit' content='Log in'>
				<LogInIcon className='mr-6' width='50' height='50' />
			</Button>
		</form>
	);
};

export default SignInUseEmailPassWord;
