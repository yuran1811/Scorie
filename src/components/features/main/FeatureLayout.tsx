import { DivProps } from '@/shared';
import { FeatureSection } from './FeatureSection';
import { FC } from 'react';

export const FeatureLayout: FC<DivProps> = ({ className }) => (
  <div className={`${className || ''} isAnimated relative top-0 left-0 px-12 py-4 w-[100vw]`}>
    <FeatureSection />
  </div>
);
