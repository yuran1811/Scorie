import { FlatLoading } from './FlatLoading';
import { ThreeDotsFade } from './ThreeDotsFade';

export * from './FlatLoading';
export * from './ThreeDotsFade';

export const LoadingCollection = () => {
  return (
    <div className="flexcenter container mx-auto w-full flex-wrap gap-4">
      <FlatLoading className="scale-75" />
      <ThreeDotsFade className="scale-75" />
    </div>
  );
};
