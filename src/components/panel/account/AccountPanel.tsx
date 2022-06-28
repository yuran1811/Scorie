import { SignIn } from 'components/auth/SignIn';
import SignInUseEmailPassWord from 'components/auth/SignInUseEmailPassword';
import { BackIcon } from 'components/icons';
import { useAccountPanel, useMenu } from 'contexts';
import { FC, HTMLProps, useEffect } from 'react';
import { useStore } from 'store';
import { AccountInfo } from './AccountInfo';

export interface AccountPanelInputs {
	email: string;
	password: string;
}

const AccountPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const currentUser = useStore((s) => s.currentUser);

	const { active: menuActive } = useMenu();
	const { active, setActive } = useAccountPanel();

	useEffect(() => {
		setActive && setActive(false);
	}, [menuActive]);

	return (
		<div
			className={`${className || ''} ${
				active ? 'translate-y-0' : 'translate-y-[-200%]'
			} z-20 transition-all duration-300 fixed top-0 left-0 px-12 pt-28 pb-14 tablet:max-w-[50rem] w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			{currentUser ? (
				<AccountInfo />
			) : (
				<div className='w-full h-[80%] overflow-x-hidden overflow-y-auto'>
					<SignInUseEmailPassWord />
					<SignIn />
				</div>
			)}
		</div>
	);
};

export default AccountPanel;
