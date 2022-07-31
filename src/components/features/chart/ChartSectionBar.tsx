import { useStore } from '@/store';
import { getChartData } from '@/utils';
import { ArrowRightIcon, ChartIcon } from '@cpns/icons';
import { Button } from '@cpns/shared';
import { Title } from '../main/sections/Title';
import { ApexBarChart } from './ApexChart';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ChartSectionBar: FC = () => {
  const scores = useStore((s) => s.scores);
  const settings = useStore((s) => s.settings);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const chartSeriesData: ApexAxisChartSeries = [
    {
      name: t('average score short'),
      data: getChartData(scores, settings.numberFormat),
    },
  ];
  const chartOptionsData: ApexCharts.ApexOptions = {
    chart: {
      height: 400,
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [t('average score'), t('expected')],
      markers: {
        fillColors: ['#00E396', '#775DD0'],
      },
    },
  };

  if (!scores.length)
    return (
      <div className="flexcentercol relative mx-auto w-full !justify-start text-[4rem] text-white mobile:text-[5rem] tablet:w-[70%]">
        <div className="p-6 text-center font-semibold">
          {t('add scores and the chart will be shown')}
        </div>
        <Button
          content="Add scores"
          before={false}
          className="group !bg-gradient-to-br from-indigo-500 to-indigo-800 !text-white"
          onClick={() => navigate('/subjects')}
        >
          <ArrowRightIcon className="isAnimated group-hover:translate-x-4" width="50" height="50" />
        </Button>
      </div>
    );

  return (
    <div className="my-[2rem] mb-[7rem] w-full">
      <div className="flexcenter w-full flex-wrap px-4">
        <Title Icon={ChartIcon} content="Analytics" />
      </div>

      <div className="mx-auto my-8 flex w-full items-start justify-center">
        <ApexBarChart
          data={{
            series: chartSeriesData,
            options: chartOptionsData,
          }}
        />
      </div>
    </div>
  );
};
