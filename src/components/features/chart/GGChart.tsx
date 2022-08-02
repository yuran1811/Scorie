// import { Chart } from 'react-google-charts';
// import { fakeGGChartData } from '@/services';

const options = {
  title: 'Company Performance',
  curveType: 'function',
  legend: { position: 'bottom' },
};

export const GGChart = () => (
  <div className="my-12 w-[90%] max-w-[60rem]">
    React Google Chart
    {/* <Chart chartType='LineChart' legendToggle data={fakeGGChartData} options={options} height={400} /> */}
  </div>
);
