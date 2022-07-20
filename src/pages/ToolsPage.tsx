import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import { ToolsSectionBar } from '@cpns/features/tools/ToolsSectionBar';
import { FC } from 'react';

export const ToolsPage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);

  return <>{currentUser === null ? <LogInRequired /> : <ToolsSectionBar />}</>;
};
