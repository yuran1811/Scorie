import { Chart } from 'react-google-charts';

export const data = [
	['Year', 'Sales', 'Expenses'],
	['2004', 1000, 400],
	['2005', 1170, 460],
	['2006', 660, 1120],
	['2007', 1030, 540],
];

export const options = {
	title: 'Company Performance',
	curveType: 'function',
	legend: { position: 'bottom' },
};

export const GGChart = () => (
	<div className='w-[90%] max-w-[60rem] my-12'>
		<Chart chartType='LineChart' legendToggle data={data} options={options} height={400} />
	</div>
);
