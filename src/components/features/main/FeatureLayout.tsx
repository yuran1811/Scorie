import { DivProps } from '@/shared';
import { FeatureSection } from './FeatureSection';
import { FC } from 'react';

export const FeatureLayout: FC<DivProps> = ({ className = '' }) => (
  <div className={`isAnimated relative left-0 top-0 w-[100vw] snap-y p-4 medtab:px-12 ${className}`}>
    <FeatureSection />
  </div>
);

export default FeatureLayout;
