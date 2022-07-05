import { FeatureLayout } from 'components/features/main/FeatureLayout';
import { FullScreenLoading } from 'components/shared';
import { FC } from 'react';

interface HomePageProps {
	isLoading: any;
}

export const HomePage: FC<HomePageProps> = ({ isLoading }) =>
	isLoading === undefined ? <FullScreenLoading /> : <FeatureLayout />;
