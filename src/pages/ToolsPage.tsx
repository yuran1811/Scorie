import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import { FC, lazy } from 'react';

const ToolsSectionBar = lazy(() => import('@cpns/features/tools/ToolsSectionBar'));

export const ToolsPage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  return currentUser === null ? <LogInRequired /> : <ToolsSectionBar />;
};

export default ToolsPage;
