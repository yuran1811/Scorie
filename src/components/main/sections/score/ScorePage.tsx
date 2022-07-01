import { useStore } from 'store';
import { ScoreSectionBar } from './ScoreSectionBar';
import { LogInRequired } from 'components/auth/LogInRequired';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ScorePage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const navigate = useNavigate();

	useEffect(() => {
		// if (currentUser === null) navigate('/');
	}, []);

	return <>{currentUser === null ? <LogInRequired /> : <ScoreSectionBar />}</>;
};
