import { withSignIn } from '@/hocs';
import ScoreSectionBar from '@cpns/features/score/ScoreSectionBar';
import { FC } from 'react';

export const ScorePage: FC = () => {
  return <ScoreSectionBar />;
};

export default withSignIn(ScorePage);
