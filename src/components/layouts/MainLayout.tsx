import { Footer, Header } from 'components/layouts/partials';
import { FC } from 'react';

const MainLayout: FC = ({ children }) => (
	<>
		<div className='relative fullsize overflow-x-hidden text-[3rem] text-white bg-ctbg'>
			<Header />
			{children}
			<Footer />
		</div>
		<div id='modal-container'></div>
	</>
);

export default MainLayout;
