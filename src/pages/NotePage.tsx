import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import { FC, lazy } from 'react';

const NoteSectionBar = lazy(() => import('@cpns/features/notes/NoteSectionBar'));

export const NotePage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  return currentUser === null ? <LogInRequired /> : <NoteSectionBar />;
};

export default NotePage;
