import { auth } from 'shared';
import { useStore } from 'store';
import { HomePage } from 'pages';
import { publicRoutes } from 'routes';
import { setUserProfile } from 'services';
import { ErrorContent } from 'components/shared';
import MainLayout from 'components/layouts/MainLayout';
import { Outlet, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';

const App: FC = () => {
	const currentUser = useStore((s) => s.currentUser);
	const setCurrentUser = useStore((s) => s.setCurrentUser);

	useEffect(() => {
		const unregisterAuth = onAuthStateChanged(auth, (user) => {
			if (!user) {
				setCurrentUser(null);
				return;
			}

			console.log('Auth changed');

			setCurrentUser(user);
			setUserProfile(user);
		});

		return () => unregisterAuth();
	}, []);

	return (
		<MainLayout>
			<Routes>
				<Route path='/'>
					<Route index element={<HomePage isLoading={currentUser} />} />
					{publicRoutes.map(({ component: Page, path }) => (
						<Route key={path} path={path} element={<Page />} />
					))}
				</Route>
				<Route path='*' element={<ErrorContent />} />
			</Routes>
			<Outlet />
		</MainLayout>
	);
};

export default App;
