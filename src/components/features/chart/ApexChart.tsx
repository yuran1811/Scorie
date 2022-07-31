import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {
  data: {
    options: ApexCharts.ApexOptions;
    series: ApexAxisChartSeries;
  };
}

export const ApexBarChart: FC<ApexChartProps> = ({ data }) => (
  <div className="m-4 w-full rounded-[1rem] bg-white p-6 text-black tablet:max-w-[65rem]">
    <ReactApexChart options={data.options} series={data.series} type={'bar'} />
  </div>
);
