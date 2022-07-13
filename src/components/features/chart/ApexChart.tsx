import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {
	data: {
		options: ApexCharts.ApexOptions;
		series: ApexAxisChartSeries;
	};
}

export const ApexBarChart: FC<ApexChartProps> = ({ data }) => (
	<div className='w-full tablet:max-w-[65rem] p-6 m-4 bg-white text-black rounded-[1rem]'>
		<ReactApexChart options={data.options} series={data.series} type={'bar'} />
	</div>
);
