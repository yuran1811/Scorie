import { FeatureSection } from './FeatureSection';
import { FC, HTMLProps } from 'react';

export const MainLayout: FC<HTMLProps<HTMLDivElement>> = ({ className }) => (
	<div className={`${className || ''} isAnimated relative top-0 left-0 px-12 py-4 w-[100vw]`}>
		<FeatureSection />
	</div>
);
