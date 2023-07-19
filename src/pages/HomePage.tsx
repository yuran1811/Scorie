import FeatureLayout from '@cpns/features/main/FeatureLayout';
import { FC } from 'react';

export const HomePage: FC = () => {
  // const currentUser = useStore((s) => s.currentUser);
  // return currentUser === null ? <FullScreenLoading /> : <FeatureLayout />;
  return <FeatureLayout />;
};

export default HomePage;
