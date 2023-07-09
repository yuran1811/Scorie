import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

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

export const ApexChartWrapper: FC<ApexChartProps> = ({ data, type = 'bar' }) => {
  const { t } = useTranslation();

  return (
    <div className="relative m-4 w-full rounded-[1rem] border-2 border-slate-400 bg-[#424242] p-6 text-black medtab:max-w-[65rem]">
      <div className="typo-sm absolute -bottom-16 -left-16 w-max rounded-3xl border-2 border-ctcolor bg-ctbg px-4 py-2 text-ctcolor">
        {t(`${type.toLowerCase()} chart`)}
      </div>
      <ReactApexChart options={data.options} series={data.series} type={type} />
    </div>
  );
};

export default ApexChartWrapper;
