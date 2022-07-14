import { useStore } from 'store';
import { getChartData } from 'utils';
import { Title } from '../main/sections/Title';
import { ArrowRightIcon, ChartIcon } from 'components/icons';
import { Button } from 'components/shared';
import { ApexBarChart } from './ApexChart';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

export const ChartSectionBar: FC = () => {
	const scores = useStore((s) => s.scores);
	const settings = useStore((s) => s.settings);

	const navigate = useNavigate();

	const chartSeriesData: ApexAxisChartSeries = [
		{
			name: 'Average',
			data: getChartData(scores, settings.numberFormat),
		},
	];
	const chartOptionsData: ApexCharts.ApexOptions = {
		chart: {
			height: 400,
		},
		plotOptions: {
			bar: {
				columnWidth: '60%',
			},
		},
		colors: ['#00E396'],
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: true,
			showForSingleSeries: true,
			customLegendItems: ['Average Score', 'Expected'],
			markers: {
				fillColors: ['#00E396', '#775DD0'],
			},
		},
	};

	if (!scores.length)
		return (
			<div className='flexcentercol relative w-full tablet:w-[70%] h-[30rem] mx-auto text-[4rem] mobile:text-[5rem] text-white'>
				<div className='font-semibold text-center p-6'>Add scores and the chart will be shown !</div>
				<Button
					content='Add scores'
					before={false}
					className='!bg-gradient-to-br from-indigo-500 to-indigo-800 !text-white group'
					onClick={() => navigate('/subjects')}
				>
					<ArrowRightIcon className='isAnimated group-hover:translate-x-4' width='50' height='50' />
				</Button>
			</div>
		);

	return (
		<div className='w-full my-[2rem] mb-[7rem]'>
			<div className='w-full flexcenter flex-wrap px-4'>
				<Title Icon={ChartIcon} content='Analytics' />
			</div>

			<div className='w-full mx-auto my-8 flex items-start justify-center'>
				<ApexBarChart
					data={{
						series: chartSeriesData,
						options: chartOptionsData,
					}}
				/>
			</div>
		</div>
	);
};
