import { FeatureLayout } from '@cpns/features/main/FeatureLayout';
import { FullScreenLoading } from '@cpns/shared';
import { FC } from 'react';

interface HomePageProps {
  isLoading: any;
}

export const HomePage: FC<HomePageProps> = ({ isLoading }) =>
  isLoading === undefined ? <FullScreenLoading /> : <FeatureLayout />;
