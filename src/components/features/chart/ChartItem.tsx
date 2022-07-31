import { FC } from 'react';
/* import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { fakeChartJSData } from '@/services';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	interaction: {
		mode: 'index' as const,
		intersect: false,
	},
	stacked: false,
	plugins: {
		title: {
			display: true,
			text: 'Score chart',
		},
	},
	scales: {
		y: {
			type: 'linear' as const,
			display: true,
			position: 'left' as const,
		},
		y1: {
			type: 'linear' as const,
			display: true,
			position: 'right' as const,
			grid: {
				drawOnChartArea: false,
			},
		},
	},
}; */

export const ChartItem: FC = () => (
  <div className="my-12 w-[90%] max-w-[60rem] bg-white p-4">
    ChartJS
    {/* <Line options={options} data={fakeChartJSData} /> */}
  </div>
);
