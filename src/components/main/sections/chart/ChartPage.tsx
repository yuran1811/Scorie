import { useStore } from 'store';
import { ChartSectionBar } from './ChartSectionBar';
import { LogInRequired } from 'components/auth/LogInRequired';
import { FC } from 'react';

export const ChartPage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	return <>{currentUser === null ? <LogInRequired /> : <ChartSectionBar />}</>;
};
