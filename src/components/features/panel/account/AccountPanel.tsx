import { useStore } from 'store';
import { DivProps } from 'shared';
import { usePanel } from 'contexts';
import { AccountInfo } from './AccountInfo';
import { BackIcon } from 'components/icons';
import { SignIn } from 'components/features/auth/SignIn';
import SignInUseEmailPassWord from 'components/features/auth/SignInUseEmailPassword';
import { FC } from 'react';

const AccountPanel: FC<DivProps> = ({ className }) => {
	const currentUser = useStore((s) => s.currentUser);

	const { active, setActive } = usePanel();

	return (
		<div
			className={`${className || ''} ${
				active.isAccount ? 'translate-y-0' : 'translate-y-[-200%]'
			} z-20 isAnimated fullscreen px-12 pt-28 pb-14 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
		>
			<BackIcon
				onClick={() =>
					setActive &&
					setActive((s) => ({
						...s,
						isAccount: false,
					}))
				}
			/>

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
