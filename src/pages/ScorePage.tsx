import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import { FC, lazy } from 'react';

const ScoreSectionBar = lazy(() => import('@cpns/features/score/ScoreSectionBar'));

export const ScorePage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  return currentUser === null ? <LogInRequired /> : <ScoreSectionBar />;
};

export default ScorePage;
