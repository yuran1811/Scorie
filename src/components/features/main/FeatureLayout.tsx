import { DivProps } from '@/shared';
import { FeatureSection } from './FeatureSection';
import { FC } from 'react';

export const FeatureLayout: FC<DivProps> = ({ className }) => (
  <div className={`${className || ''} isAnimated relative top-0 left-0 w-[100vw] px-12 py-4`}>
    <FeatureSection />
  </div>
);
