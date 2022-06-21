import { BackIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces/ErrorMessage';
import { Button, Input } from 'components/shared';
import { useAccount, useAuth } from 'contexts';
import { FC, HTMLProps, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountInfo } from './AccountInfo';

type Inputs = {
	email: string;
	password: string;
};

const AccountPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active, setActive } = useAccount();
	const { auth, setAuth } = useAuth();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
		const { email, password } = data;
		setAuth && setAuth({ email, password });
	}, []);

	return (
		<div
			className={`${className} ${
				active ? 'translate-y-0' : 'translate-y-[-200%]'
			} z-20 transition-all duration-300 fixed top-0 left-0 px-12 py-20 w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			{!auth.isAuth ? (
				<>
					<form className='flexcentercol' onSubmit={handleSubmit(onSubmit)}>
						<Input
							placeholder='Email'
							defaultValue=''
							formHandle={{
								...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }),
							}}
						/>
						{errors?.email && (
							<ErrorMessage
								extraStyle='text-[2rem]'
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
								extraStyle='text-[2rem]'
								content={errors?.password.type === 'required' ? 'Please fill this field' : 'At least 6 characters'}
							/>
						)}

						<Button type='submit' content='Log in' />
					</form>
				</>
			) : (
				<AccountInfo />
			)}
		</div>
	);
};

export default AccountPanel;
