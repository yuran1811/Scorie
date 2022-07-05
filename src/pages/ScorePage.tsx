import { useStore } from 'store';
import { LogInRequired } from 'components/features/auth/LogInRequired';
import { ScoreSectionBar } from 'components/features/score/ScoreSectionBar';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';

export const ScorePage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const navigate = useNavigate();

	useEffect(() => {
		// if (currentUser === null) navigate('/');
	}, []);

	return <>{currentUser === null ? <LogInRequired /> : <ScoreSectionBar />}</>;
};
