import { Avatar } from 'components/shared';
import { useAuth, useMenu } from 'contexts';
import { FC, HTMLProps } from 'react';
import AccountContainer from './account/AccountContainer';
import SettingContainer from './setting/SettingContainer';

export const Panel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active } = useMenu();

	const { auth } = useAuth();

	return (
		<div
			className={`${className} ${
				active ? 'translate-x-0' : 'translate-x-[-200%]'
			} transition-all duration-300 fixed top-0 left-0 px-12 py-20 max-w-[40rem] w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
		>
			<div className='flexcenter w-full pt-8'>
				<Avatar className='cursor-pointer' imgUrl='' radius='5rem' />
				<div className='font-bold mx-6 text-[4rem] text-left w-full max-w-[calc(80%-5rem)] line-clamp-1'>
					{auth.isAuth ? auth.name : 'Guest'}
				</div>
			</div>

			<div className='flexcentercol !justify-start w-full h-[80%] py-4 my-4 overflow-x-hidden overflow-y-auto'>
				<AccountContainer />
				<SettingContainer />
			</div>
		</div>
	);
};
