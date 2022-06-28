import { FC, HTMLProps } from 'react';
import { FeatureSection } from './FeatureSection';

export const MainLayout: FC<HTMLProps<HTMLDivElement>> = ({ className }) => (
	<div className={`${className || ''} transition-all duration-300 relative top-0 left-0 px-12 py-4 w-[100vw]`}>
		<FeatureSection />
	</div>
);
