import { ArrowLeftIcon, ArrowRightIcon, LogInIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input } from 'components/shared';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { auth } from 'shared';
import { useStore } from 'store';
import { getFirebaseErr } from 'utils';
import { CreateNewUser } from './CreateNewUser';

interface AccountPanelInputs {
	email: string;
	password: string;
}

const SignInUseEmailPassWord = () => {
	const [isNew, setNew] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const setCurrentUser = useStore((s) => s.setCurrentUser);

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountPanelInputs>();

	const onSubmit: SubmitHandler<AccountPanelInputs> = useCallback((data) => {
		const { email, password } = data;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setCurrentUser(user);
			})
			.catch((error) => {
				setErrMsg(getFirebaseErr(error.message));
			});
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [watch('email'), watch('password')]);

	return (
		<>
			{isNew ? (
				<CreateNewUser>
					<Button className='!text-[3rem]' content='Log in' onClick={() => setNew(false)}>
						<ArrowLeftIcon className='mr-6' width='40' height='40' />
					</Button>
				</CreateNewUser>
			) : (
				<>
					<form className='flexcentercol !justify-start mt-6' onSubmit={handleSubmit(onSubmit)}>
						<Input
							name='email'
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
							name='password'
							placeholder='Password'
							defaultValue=''
							formHandle={{ ...register('password', { required: true, pattern: /^[\d\w]{6,}$/ }) }}
						/>
						{errors?.password && (
							<ErrorMessage
								extraStyle='text-[3rem]'
								content={
									errors?.password.type === 'required'
										? 'Please fill this field'
										: 'At least 6 characters'
								}
							/>
						)}

						{errMsg && <ErrorMessage extraStyle='text-[3rem]' content={errMsg} />}

						<Button className='!text-[3rem]' type='submit' content='Log in'>
							<LogInIcon className='mr-6' width='40' height='40' />
						</Button>
					</form>

					<Button
						before={false}
						className='!text-[3rem]'
						content='Create new account'
						onClick={() => setNew(true)}
					>
						<ArrowRightIcon className='ml-6' width='40' height='40' />
					</Button>
				</>
			)}
		</>
	);
};

export default SignInUseEmailPassWord;
