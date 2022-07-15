import { useStore } from 'store';
import { AnimateLogo } from 'components/features/animations';
import { Footer, Header } from 'components/layouts/partials';
import { AppStatusProvider } from 'contexts/AppStatusContext';
import { AppStatusPopup } from 'components/shared/AppStatusPopup';
import { ToastContainer } from 'react-toastify';
import { FC } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';

const MainLayout: FC = ({ children }) => {
	const settings = useStore((s) => s.settings);

	return (
		<AppStatusProvider>
			<div className='relative fullsize overflow-x-hidden text-[3rem] text-white bg-ctbg'>
				<Header />
				<div>
					{settings.showStartUpLogo && <AnimateLogo />}
					{children}
				</div>
				<Footer />
			</div>
			<div id='modal-container'>
				<AppStatusPopup />
			</div>
			<ToastContainer theme='dark' />
		</AppStatusProvider>
	);
};

export default MainLayout;
