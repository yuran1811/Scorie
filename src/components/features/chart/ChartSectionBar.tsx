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
      name: 'Average',
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
      customLegendItems: ['Average Score', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0'],
      },
    },
  };

  if (!scores.length)
    return (
      <div className="flexcentercol !justify-start relative w-full tablet:w-[70%] mx-auto text-[4rem] mobile:text-[5rem] text-white">
        <div className="font-semibold text-center p-6">
          {t('add scores and the chart will be shown')}
        </div>
        <Button
          content="Add scores"
          before={false}
          className="!bg-gradient-to-br from-indigo-500 to-indigo-800 !text-white group"
          onClick={() => navigate('/subjects')}
        >
          <ArrowRightIcon className="isAnimated group-hover:translate-x-4" width="50" height="50" />
        </Button>
      </div>
    );

  return (
    <div className="w-full my-[2rem] mb-[7rem]">
      <div className="w-full flexcenter flex-wrap px-4">
        <Title Icon={ChartIcon} content="Analytics" />
      </div>

      <div className="w-full mx-auto my-8 flex items-start justify-center">
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
