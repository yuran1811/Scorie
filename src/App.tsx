import { auth } from 'shared';
import { useStore } from 'store';
import { HomePage } from 'pages';
import { useQuotes } from 'hooks';
import { publicRoutes } from 'routes';
import { mergeQuoteData } from 'utils';
import { setUserProfile } from 'services';
import { ErrorContent } from 'components/shared';
import MainLayout from 'components/layouts/MainLayout';
import { Outlet, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';
// import IconCollection from 'components/icons/IconCollection';

const App: FC = () => {
	const quotes = useStore((s) => s.quotes);
	const setQuotes = useStore((s) => s.setQuotes);
	const currentUser = useStore((s) => s.currentUser);
	const setCurrentUser = useStore((s) => s.setCurrentUser);

	const { data, error, loading, controller } = useQuotes(quotes.numPage, !quotes.numPage || quotes.isFetch);

	useEffect(() => {
		if (error) return;

		const { canUpdate, mergeData } = mergeQuoteData(quotes, data);
		canUpdate && setQuotes(mergeData);

		return () => controller.abort();
	}, [data, error, loading]);

	useEffect(() => {
		const unregisterAuth = onAuthStateChanged(auth, (user) => {
			if (!user) {
				setCurrentUser(null);
				return;
			}

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

			{/* <IconCollection /> */}
		</MainLayout>
	);
};

export default App;
