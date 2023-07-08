import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {
  data: {
    options: ApexCharts.ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  };
  type?:
    | 'area'
    | 'line'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar';
}

export const ApexChartWrapper: FC<ApexChartProps> = ({ data, type = 'bar' }) => (
  <div className="medtab:max-w-[65rem] m-4 w-full rounded-[1rem] border-2 border-slate-400 bg-[#424242] p-6 text-black">
    <ReactApexChart options={data.options} series={data.series} type={type} />
  </div>
);

export default ApexChartWrapper;
