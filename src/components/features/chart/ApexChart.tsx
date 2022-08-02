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

export const ApexChartWrapper: FC<ApexChartProps> = ({ data, type }) => (
  <div className="m-4 w-full rounded-[1rem] border-2 border-slate-400 bg-[#424242] p-6 text-black tablet:max-w-[65rem]">
    <ReactApexChart options={data.options} series={data.series} type={type || 'bar'} />
  </div>
);
