import { useStore } from 'store';
import { LogInRequired } from 'components/features/auth/LogInRequired';
import { ScoreSectionBar } from 'components/features/score/ScoreSectionBar';
import { FC } from 'react';

export const ScorePage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	return <>{currentUser === null ? <LogInRequired /> : <ScoreSectionBar />}</>;
};
