import { MainLayout } from 'components/main/MainLayout';
import { Footer, Header } from 'components/partials';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';
import { auth } from 'shared';
import { useStore } from 'store';

const App: FC = () => {
	const currentUser = useStore((state) => state.currentUser);
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	useEffect(() => {
		const unregisterAuth = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setCurrentUser(null);
				return;
			}

			setCurrentUser(user);

			const token = await user.getIdToken();

			console.log('user: ', user);
			console.log('token: ', token);
		});

		return () => unregisterAuth();
	}, []);

	return (
		<div className='relative w-[100vw] h-[100vh] overflow-x-hidden text-[3rem] text-white bg-ctbg'>
			<Header />
			<MainLayout />
			<Footer />
		</div>
	);
};

export default App;
