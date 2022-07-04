import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { FC } from 'react';
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
};

const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Maths',
			data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
			borderColor: '#1e3a8a',
			backgroundColor: '#93c5fd',
			yAxisID: 'y',
		},
		{
			label: 'Physics',
			data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
			borderColor: '#0f766e',
			backgroundColor: '#5eead4',
			yAxisID: 'y1',
		},
	],
};

export const ChartItem: FC = () => (
	<div className='w-[90%] max-w-[60rem] my-12 p-4 bg-white rounded-[2rem]'>
		<Line options={options} data={data} />
	</div>
);
