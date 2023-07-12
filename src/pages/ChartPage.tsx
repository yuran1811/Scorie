import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import { FC, lazy } from 'react';

const ChartSectionBar = lazy(() => import('@cpns/features/chart/ChartSectionBar'));

export const ChartPage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  return currentUser === null ? <LogInRequired /> : <ChartSectionBar />;
};

export default ChartPage;
