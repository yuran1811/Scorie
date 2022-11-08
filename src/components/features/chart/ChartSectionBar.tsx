import { useStore } from '@/store';
import { getChartData } from '@/utils';
import { ArrowRightIcon, BackIcon, ChartIcon } from '@cpns/icons';
import { Button } from '@cpns/shared';
import { t as T } from 'i18next';
import __ from 'lodash';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Title } from '../main/sections/Title';
import { ApexChartWrapper } from './ApexChart';

const columnDefaultOptions: ApexCharts.ApexOptions = {
  chart: { height: 400 },
  theme: { mode: 'dark' },
  colors: ['#00E396'],
  dataLabels: { enabled: false },
  plotOptions: { bar: { columnWidth: '60%' } },
  legend: {
    show: true,
    showForSingleSeries: true,
    markers: { fillColors: ['#00E396', '#775DD0'] },
  },
};
const polarDefaultOptions: ApexCharts.ApexOptions = {
  chart: { height: 400 },
  theme: {
    mode: 'dark',
    palette: 'pallete7',
    monochrome: { enabled: false, shadeTo: 'dark', shadeIntensity: 0.5, color: '#13D8AA' },
  },
  fill: { opacity: 1 },
  stroke: { width: 1, colors: undefined },
  legend: { position: 'bottom' },
  yaxis: { show: false },
  dataLabels: { enabled: false, textAnchor: 'middle', style: { fontSize: '12px !important' } },
  plotOptions: { polarArea: { rings: { strokeWidth: 0 }, spokes: { strokeWidth: 0 } } },
};
const radarDefaultOptions: ApexCharts.ApexOptions = {
  chart: { height: 400, toolbar: { show: false } },
  theme: { mode: 'dark', palette: 'palette1' },
  dataLabels: { enabled: false },
  markers: { size: 6 },
  fill: { opacity: 0.4 },
  tooltip: {
    enabled: true,
    custom: ({ series, seriesIndex, dataPointIndex }) =>
      `${T('amount')}: ${series[seriesIndex][dataPointIndex]}`,
  },
  yaxis: { show: false, labels: { style: { fontSize: '0px !important' } } },
};

export const ChartSectionBar: FC = () => {
  const scores = useStore((s) => s.scores);
  const settings = useStore((s) => s.settings);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dataToUse: any = getChartData(scores, settings.numberFormat);

  const radarCategories = __.uniq(
    __.flattenDeep(scores.map((subject) => subject.scores.map((score) => Math.round(score.value))))
  ).sort();

  const srs: {
    [key: string]: ApexAxisChartSeries | ApexNonAxisChartSeries;
  } = {
    column: [
      {
        name: t('average score short'),
        data: dataToUse,
      },
    ],
    polar: __.map(dataToUse, (_) => +(_.average.total / _.average.count).toFixed(2)),
    radar: scores.map((subject) => ({
      name: subject.name,
      data: radarCategories.map((cate) =>
        __.map(subject.scores, 'value').reduce(
          (prev, score) => prev + +(Math.round(score) === cate),
          0
        )
      ),
    })),
  };

  const opts: {
    [key: string]: ApexCharts.ApexOptions;
  } = {
    column: {
      ...columnDefaultOptions,
      legend: { customLegendItems: [t('average score'), t('expected')] },
    },
    polar: {
      ...polarDefaultOptions,
      labels: __.map(scores, 'name'),
    },
    radar: {
      ...radarDefaultOptions,
      xaxis: { categories: radarCategories },
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
      <div className="flexcenter w-full flex-wrap gap-4 px-4">
        <BackIcon className="text-white" onClick={() => navigate(-1)} />
        <Title Icon={ChartIcon} content="Analytics" />
      </div>

      <div className="mx-auto my-8 flex w-full flex-col items-center justify-start !text-[1.4rem] tracking-normal tablet:!text-[1.6rem]">
        <ApexChartWrapper data={{ series: srs.column, options: opts.column }} type="bar" />
        <ApexChartWrapper data={{ series: srs.polar, options: opts.polar }} type="polarArea" />
        <ApexChartWrapper data={{ series: srs.radar, options: opts.radar }} type="radar" />
      </div>
    </div>
  );
};
