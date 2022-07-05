import { useStore } from 'store';
import { LogInRequired } from 'components/features/auth/LogInRequired';
import { ToolsSectionBar } from 'components/features/tools/ToolsSectionBar';
import { FC } from 'react';

export const ToolsPage: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	return <>{currentUser === null ? <LogInRequired /> : <ToolsSectionBar />}</>;
};
