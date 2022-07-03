import { useStore } from 'store';
import { DivProps } from 'shared';
import { AccountInfo } from './AccountInfo';
import { BackIcon } from 'components/icons';
import { SignIn } from 'components/auth/SignIn';
import { useAccountPanel, useMenu } from 'contexts';
import SignInUseEmailPassWord from 'components/auth/SignInUseEmailPassword';
import { FC, useEffect } from 'react';

const AccountPanel: FC<DivProps> = ({ className }) => {
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
			} z-20 isAnimated fullscreen px-12 pt-28 pb-14 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
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
