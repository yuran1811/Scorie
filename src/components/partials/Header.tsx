import { MenuIcon } from 'components/icons';
import { Panel } from 'components/panel';
import { Avatar } from 'components/shared';
import { MenuProvider } from 'contexts';
import { FC } from 'react';

export const Header: FC = () => {
	return (
		<header className='z-10 flexcenter !justify-between sticky top-0 w-full h-[8rem] bg-ctbg'>
			<MenuProvider>
				<MenuIcon className='mx-10 z-20' />
				<Panel className='z-10' />
			</MenuProvider>

			<div className='font-bold text-[4.6rem] text-center'>Scorie</div>

			<Avatar className='mx-8' imgUrl='' radius='5.5rem' />
		</header>
	);
};
