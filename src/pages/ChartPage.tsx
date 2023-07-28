import { withSignIn } from '@/hocs';
import ChartSectionBar from '@cpns/features/chart/ChartSectionBar';
import { FC } from 'react';

const ChartPage: FC = () => {
  return <ChartSectionBar />;
};

export default withSignIn(ChartPage);
