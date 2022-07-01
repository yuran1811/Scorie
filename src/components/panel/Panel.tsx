import { useStore } from 'store';
import { useMenu } from 'contexts';
import DocContainer from './doc/DocContainer';
import { Avatar, Overlay } from 'components/shared';
import AccountContainer from './account/AccountContainer';
import SettingContainer from './setting/SettingContainer';
import { FC, HTMLProps } from 'react';

export const Panel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const currentUser = useStore((s) => s.currentUser);

	const { active, setActive } = useMenu();

	return (
		<>
			{active && <Overlay onClick={() => setActive && setActive(false)} />}

			<div
				className={`${className || ''} ${
					active ? 'translate-x-0' : 'translate-x-[-200%]'
				} isAnimated fullscreen px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
			>
				<div className='z-[2] flexcenter w-full tablet:px-6 pt-14 m-auto'>
					{currentUser && (
						<Avatar
							className='mobile:block hidden cursor-pointer'
							imgUrl={currentUser?.photoURL ? currentUser.photoURL : ''}
							radius='7rem'
						/>
					)}
					<div className='font-bold mx-6 text-[4.5rem] text-center mobile:text-left line-clamp-1'>
						{currentUser?.displayName ? currentUser.displayName : 'Guest'}
					</div>
				</div>

				<div className='z-[1] flexcentercol !justify-start w-full h-[80%] pb-12 my-4 text-[4rem] scrollY'>
					<AccountContainer />
					<SettingContainer />
					<DocContainer />
				</div>
			</div>
		</>
	);
};
