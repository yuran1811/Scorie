import { FullScreenLoading } from '@cpns/shared';
import { FC, lazy } from 'react';

const FeatureLayout = lazy(() => import('@cpns/features/main/FeatureLayout'));

interface HomePageProps {
  isLoading: any;
}

export const HomePage: FC<HomePageProps> = ({ isLoading }) =>
  isLoading === undefined ? <FullScreenLoading /> : <FeatureLayout />;
