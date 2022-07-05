import { FC } from 'react';
import { DivProps } from 'shared';
import { FeatureSection } from './FeatureSection';

export const FeatureLayout: FC<DivProps> = ({ className }) => (
	<div className={`${className || ''} isAnimated relative top-0 left-0 px-12 py-4 w-[100vw]`}>
		<FeatureSection />
	</div>
);
