import { AnimateLogo } from 'components/features/animations';
import { Footer, Header } from 'components/layouts/partials';
import { ErrorModalProvider } from 'contexts/ErrorModalContext';
import { FC } from 'react';

const MainLayout: FC = ({ children }) => (
	<ErrorModalProvider>
		<div className='relative fullsize overflow-x-hidden text-[3rem] text-white bg-ctbg'>
			<Header />
			<div>
				<AnimateLogo />
				{children}
			</div>
			<Footer />
		</div>
		<div id='modal-container'></div>
	</ErrorModalProvider>
);

export default MainLayout;
