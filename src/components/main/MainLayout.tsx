import { useAuth } from 'contexts';
import { FC, HTMLProps } from 'react';
import { AddButton } from './AddButton';
import { ChartSectionBar } from './sections/chart/ChartSectionBar';
import { ScoreSectionBar } from './sections/score/ScoreSectionBar';
import { ToolsSectionBar } from './sections/tools/ToolsSectionBar';

export const MainLayout: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { auth } = useAuth();

	return (
		<div className={`${className || ''} transition-all duration-300 relative top-0 left-0 px-12 py-4 w-[100vw]`}>
			<AddButton />

			<div className='w-full pt-8'>
				<div className='font-bold text-[4.5rem] text-center w-full line-clamp-1'>Welcome,</div>
				<div className='font-bold text-[6rem] text-center w-full line-clamp-1'>{auth.isAuth ? auth.name : 'Guest'}!</div>
			</div>

			<div className='w-full pt-8'>
				<ScoreSectionBar />
				{/* <ChartSectionBar /> */}
				{/* <ToolsSectionBar /> */}
			</div>
		</div>
	);
};
