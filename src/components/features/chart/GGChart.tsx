import { Chart } from 'react-google-charts';
import { fakeGGChartData } from 'services';

export const options = {
	title: 'Company Performance',
	curveType: 'function',
	legend: { position: 'bottom' },
};

export const GGChart = () => (
	<div className='w-[90%] max-w-[60rem] my-12'>
		<Chart chartType='LineChart' legendToggle data={fakeGGChartData} options={options} height={400} />
	</div>
);
