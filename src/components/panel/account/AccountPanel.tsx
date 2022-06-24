import { BackIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces/ErrorMessage';
import { Button, Input } from 'components/shared';
import { AuthStateType, useAccount, useAuth, useMenu } from 'contexts';
import { useLocalStore } from 'hooks';
import { FC, HTMLProps, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_CONTEXT_DEFAULT } from '../../../constants';
import { AccountInfo } from './AccountInfo';

export interface AccountPanelInputs {
	email: string;
	password: string;
}

const AccountPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const [localData, setLocalData] = useLocalStore<AuthStateType>('data', { ...AUTH_CONTEXT_DEFAULT }, '{}');
	const { active: menuActive } = useMenu();
	const { active, setActive } = useAccount();
	const { auth, setAuth } = useAuth();

	const [errorMsg, setErrorMsg] = useState('');

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<AccountPanelInputs>();

	const onSubmit: SubmitHandler<AccountPanelInputs> = useCallback((data) => {
		const { email, password } = data;
		setAuth && setAuth({ email, password });
	}, []);

	useEffect(() => {
		if (auth.isAuth === null) {
			setLocalData({ ...localData, errorMessage: '' });
			setErrorMsg('');
			return;
		}

		if (auth.isAuth === false) {
			setErrorMsg(auth.errorMessage);
			return;
		}
	}, [auth]);

	useEffect(() => {
		setLocalData({ ...localData, errorMessage: '' });
		setErrorMsg('');
	}, [watch('email'), watch('password')]);

	useEffect(() => {
		setErrorMsg('');
		setActive && setActive(false);
	}, [menuActive]);

	useEffect(() => {
		setErrorMsg('');
	}, [active]);

	useEffect(() => {
		return () => {
			setAuth && setAuth({ reset: true });
			setErrorMsg('');
			reset({ email: '', password: '' }, { keepErrors: false });
		};
	}, []);

	return (
		<div
			className={`${className || ''} ${
				active ? 'translate-y-0' : 'translate-y-[-200%]'
			} z-20 transition-all duration-300 fixed top-0 left-0 px-12 pt-28 pb-14 tablet:max-w-[50rem] w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			{!auth.isAuth ? (
				<>
					<form
						className='flexcentercol !justify-start h-[80%] pb-8 mt-[2rem] overflow-x-hidden overflow-y-auto'
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							placeholder='Email'
							defaultValue=''
							formHandle={{
								...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }),
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

						{errorMsg && <ErrorMessage extraStyle='text-[3rem]' content={errorMsg} />}

						<Button type='submit' content='Log in' />
					</form>
				</>
			) : (
				<AccountInfo setErrorMsg={setErrorMsg} resetForms={reset} />
			)}
		</div>
	);
};

export default AccountPanel;
