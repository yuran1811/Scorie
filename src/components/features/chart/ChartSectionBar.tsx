import { ChartIcon } from 'components/icons';
import { FC } from 'react';
import { Title } from '../main/sections/Title';
import { AntChart } from './AntChart';
import { ChartItem } from './ChartItem';
import { GGChart } from './GGChart';

export const ChartSectionBar: FC = () => {
	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap px-4'>
				<Title Icon={ChartIcon} content='Analytics' />
			</div>

			<div className='w-full mx-auto my-8 flexcentercol'>
				<AntChart />
				<GGChart />
				<ChartItem />
			</div>
		</div>
	);
};
