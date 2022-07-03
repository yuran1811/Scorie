import { useStore } from 'store';
import { NoteSectionBar } from './NoteSectionBar';
import { LogInRequired } from 'components/auth/LogInRequired';
import { FC } from 'react';

export const NotePage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	return <>{currentUser === null ? <LogInRequired /> : <NoteSectionBar />}</>;
};
