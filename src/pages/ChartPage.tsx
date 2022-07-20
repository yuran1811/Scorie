import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';
import { ChartSectionBar } from '@cpns/features/chart/ChartSectionBar';
import { FC } from 'react';

export const ChartPage: FC = () => {
  const currentUser = useStore((s) => s.currentUser);

  return <>{currentUser === null ? <LogInRequired /> : <ChartSectionBar />}</>;
};
