import { scrollToEle } from '@/utils';
import { FC, useEffect } from 'react';
import ReactApexChart, { Props } from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

type ApexChartProps = Pick<Props, 'type'> & {
  data: {
    options: ApexCharts.ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  };
};

export const ApexChartWrapper: FC<ApexChartProps> = ({ data, type = 'bar' }) => {
  const { t } = useTranslation();

  useEffect(() => {
    scrollToEle(`#chart-${type}`);
  });

  return (
    <div
      id={`chart-${type}`}
      className="relative m-4 w-full rounded-[1rem] border-2 border-slate-400 bg-[#424242] p-6 text-black medtab:max-w-[65rem]"
    >
      <div className="typo-sm absolute -bottom-16 left-1/2 w-max -translate-x-1/2 rounded-3xl border-2 border-ctcolor bg-ctbg px-4 py-2 font-semibold text-ctcolor">
        {t(`${type.toLowerCase()} chart`)}
      </div>
      <ReactApexChart options={data.options} series={data.series} type={type} />
    </div>
  );
};

export default ApexChartWrapper;
