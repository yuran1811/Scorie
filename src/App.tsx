import { MainLayout } from 'components/main/MainLayout';
import { ScoreDetail } from 'components/main/sections/score/ScoreDetail';
import { ScoreSectionBar } from 'components/main/sections/score/ScoreSectionBar';
import { Footer, Header } from 'components/partials';
import { ErrorContent, Loading } from 'components/shared';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FC, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { auth, db } from 'shared';
import { useStore } from 'store';

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
		<div className='relative w-[100vw] h-[100vh] overflow-x-hidden text-[3rem] text-white bg-ctbg'>
			<Header />

			<Routes>
				<Route path='/'>
					<Route index element={currentUser === undefined ? <Loading /> : <MainLayout />} />
					<Route path='scores'>
						<Route index element={<ScoreSectionBar />} />
						<Route path=':subjectId'>
							<Route index element={<ScoreDetail />} />
							<Route path=':scoreId' element={<ScoreDetail />} />
						</Route>
					</Route>
				</Route>
				<Route path='*' element={<ErrorContent />} />
			</Routes>
			<Outlet />

			<Footer />
		</div>
	);
};

export default App;
