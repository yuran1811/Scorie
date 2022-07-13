import { useStore } from 'store';
import { LogInRequired } from 'components/features/auth/LogInRequired';
import { ChartSectionBar } from 'components/features/chart/ChartSectionBar';
import { FC } from 'react';

export const ChartPage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	return <>{currentUser === null ? <LogInRequired /> : <ChartSectionBar />}</>;
};
