import { LogOutIcon } from 'components/icons';
import { Button } from 'components/shared';
import { useAuth } from 'contexts';
import { Dispatch, FC, SetStateAction } from 'react';
import { UseFormReset } from 'react-hook-form';

export interface AccountInfoInputs {
	email: string;
	password: string;
}

export interface AccountInfoProps {
	resetForms: UseFormReset<AccountInfoInputs>;
	setErrorMsg: Dispatch<SetStateAction<string>>;
}

export const AccountInfo: FC<AccountInfoProps> = ({ setErrorMsg, resetForms }) => {
	const { auth, setAuth } = useAuth();

	return (
		<div className='flexcentercol !justify-start mt-[2rem] h-[80%] p-3 pb-16 overflow-x-hidden overflow-y-auto'>
			<div className='font-bold text-[5rem]'>{auth.name}</div>

			<Button
				content='Log out'
				onClick={() => {
					resetForms({ email: '', password: '' }, { keepErrors: false });
					setAuth && setAuth({ reset: true });
					setErrorMsg('');
				}}
			>
				<LogOutIcon className='mr-6' width='50' height='50' />
			</Button>
			<Button content='Change password' />
		</div>
	);
};
