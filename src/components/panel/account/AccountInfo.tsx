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
		<div className='flexcentercol mt-[2rem] p-3'>
			<div>{auth.name}</div>

			<Button
				content='Log out'
				onClick={() => {
					resetForms({ email: '', password: '' }, { keepErrors: false });
					setAuth && setAuth({ reset: true });
					setErrorMsg('');
				}}
			/>
			{/* <Button content='Change password' /> */}
		</div>
	);
};
