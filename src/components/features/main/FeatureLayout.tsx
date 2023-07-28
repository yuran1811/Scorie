import { DivProps } from '@/shared';
import { FC } from 'react';
import { FeatureSection } from './FeatureSection';

export const FeatureLayout: FC<DivProps> = ({ className = '' }) => (
  <div className={`isAnimated relative left-0 top-0 w-[100vw] snap-y p-4 medtab:px-12 ${className}`}>
    <FeatureSection />
  </div>
);

export default FeatureLayout;
