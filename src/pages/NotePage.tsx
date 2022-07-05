import { useStore } from 'store';
import { LogInRequired } from 'components/features/auth/LogInRequired';
import { NoteSectionBar } from 'components/features/notes/NoteSectionBar';
import { FC } from 'react';

export const NotePage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	return <>{currentUser === null ? <LogInRequired /> : <NoteSectionBar />}</>;
};
