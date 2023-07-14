import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import ScoreSectionBar from '@cpns/features/score/ScoreSectionBar';
import { FC } from 'react';

export const ScorePage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  return currentUser === null ? <LogInRequired /> : <ScoreSectionBar />;
};

export default ScorePage;
