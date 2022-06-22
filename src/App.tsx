import ErrorBoundary from 'components/ErrorBoundary';
import { MainLayout } from 'components/main/MainLayout';
import { Footer, Header } from 'components/partials';
import { FC } from 'react';

const App: FC = () => (
	<ErrorBoundary>
		<div className='relative w-[100vw] h-[100vh] overflow-x-hidden text-[3rem] text-white bg-ctbg'>
			<Header />
			<MainLayout />
			<Footer />
		</div>
	</ErrorBoundary>
);

export default App;
