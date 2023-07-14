import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import NoteSectionBar from '@cpns/features/notes/NoteSectionBar';
import { FC } from 'react';

export const NotePage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  return currentUser === null ? <LogInRequired /> : <NoteSectionBar />;
};

export default NotePage;
