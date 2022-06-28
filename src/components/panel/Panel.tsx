import { Avatar, Overlay } from 'components/shared';
import { useMenu } from 'contexts';
import { FC, HTMLProps } from 'react';
import { useStore } from 'store';
import AccountContainer from './account/AccountContainer';
import DocContainer from './doc/DocContainer';
import SettingContainer from './setting/SettingContainer';

export const Panel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const currentUser = useStore((s) => s.currentUser);

	const { active, setActive } = useMenu();

	return (
		<>
			{active && <Overlay onClick={() => setActive && setActive(false)} />}

			<div
				className={`${className || ''} ${
					active ? 'translate-x-0' : 'translate-x-[-200%]'
				} transition-all duration-300 fixed top-0 left-0 px-12 py-20 tablet:max-w-[50rem] w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
			>
				{currentUser ? (
					<div className='z-[2] flexcenter w-full tablet:px-6 pt-14 m-auto'>
						<Avatar
							className='cursor-pointer'
							imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
							radius='7rem'
						/>
						<div className='font-bold mx-6 text-[4rem] text-left line-clamp-1'>
							{currentUser.displayName}
						</div>
					</div>
				) : (
					<div className='z-[2] flexcenter w-full tablet:px-6 pt-14 m-auto'>
						<div className='font-bold mx-6 text-[5rem] text-left line-clamp-1'>Guest</div>
					</div>
				)}

				<div className='z-[1] flexcentercol !justify-start w-full h-[80%] py-4 pb-12 my-4 text-[4rem] overflow-x-hidden overflow-y-auto'>
					<AccountContainer />
					<SettingContainer />
					<DocContainer />
				</div>
			</div>
		</>
	);
};
