import { Avatar, Overlay } from 'components/shared';
import { useAuth, useMenu } from 'contexts';
import { FC, HTMLProps } from 'react';
import AccountContainer from './account/AccountContainer';
import SettingContainer from './setting/SettingContainer';

export const Panel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active, setActive } = useMenu();

	const { auth } = useAuth();

	return (
		<>
			{active && <Overlay onClick={() => setActive && setActive(false)} />}

			<div
				className={`${className} ${
					active ? 'translate-x-0' : 'translate-x-[-200%]'
				} transition-all duration-300 fixed top-0 left-0 px-12 py-20 max-w-[40rem] w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
			>
				<div className='z-[2] flexcenter w-full pt-14'>
					<Avatar className='cursor-pointer' imgUrl='' radius='7rem' />
					<div className='font-bold mx-6 text-[4rem] text-left w-full max-w-[calc(80%-5rem)] line-clamp-2'>
						{auth.isAuth ? auth.name : 'Guest'}
					</div>
				</div>

				<div className='z-[1] flexcentercol !justify-start w-full h-[80%] py-4 my-4 text-[4rem] overflow-x-hidden overflow-y-auto'>
					<AccountContainer />
					<SettingContainer />
				</div>
			</div>
		</>
	);
};
