import { MenuProvider } from 'contexts';
import { MenuIcon } from 'components/icons';
import { Panel } from 'components/features/panel';
import { ExtraTools } from 'components/features/extras';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export const Header: FC = () => (
	<header className='z-20 flexcenter !justify-between sticky top-0 w-full h-[8rem] bg-ctbg'>
		<MenuProvider>
			<MenuIcon className='mx-10 z-20' />
			<Panel className='z-[19]' />
		</MenuProvider>

		<Link to='/'>
			<div className='font-bold text-[4rem] mobile:text-[4.6rem] text-center'>Scorie</div>
		</Link>

		<ExtraTools />
	</header>
);
