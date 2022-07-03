import { useStore } from 'store';
import { auth, db } from 'shared';
import { Footer, Header } from 'components/partials';
import { MainLayout } from 'components/main/MainLayout';
import { ErrorContent, FullScreenLoading } from 'components/shared';
import { NotePage } from 'components/main/sections/notes/NotePage';
import { ScorePage } from 'components/main/sections/score/ScorePage';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FC, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const App: FC = () => {
	const currentUser = useStore((s) => s.currentUser);
	const setCurrentUser = useStore((s) => s.setCurrentUser);

	useEffect(() => {
		const unregisterAuth = onAuthStateChanged(auth, (user) => {
			if (!user) {
				setCurrentUser(null);
				return;
			}

			setCurrentUser(user);
			setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				photoURL: user.photoURL,
				displayName: user.displayName,
				email: user.email,
			});
		});

		return () => unregisterAuth();
	}, []);

	return (
		<>
			<div className='relative fullsize overflow-x-hidden text-[3rem] text-white bg-ctbg'>
				<Header />

				<Routes>
					<Route path='/'>
						<Route index element={currentUser === undefined ? <FullScreenLoading /> : <MainLayout />} />
						<Route path='subjects' element={<ScorePage />} />
						<Route path='notes' element={<NotePage />} />
					</Route>
					<Route path='*' element={<ErrorContent />} />
				</Routes>
				<Outlet />

				<Footer />
			</div>

			<div id='modal-container'></div>
		</>
	);
};

export default App;
