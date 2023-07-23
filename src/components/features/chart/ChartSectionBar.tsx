import { useStore } from '@/store';
import { getChartData, scrollToTop } from '@/utils';
import { ArrowRightIcon, BackIcon, ChartIcon } from '@cpns/icons';
import { Button, InlineLoading } from '@cpns/shared';
import __ from 'lodash';
import { FC, Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Title } from '../main/sections/Title';
import { ChartFilter } from './ChartFilter';
import { columnDefaultOptions, polarDefaultOptions, radarDefaultOptions } from './chartDefaultOptions';

type ChartUsedType = Record<string, boolean>;

const ApexChartWrapper = lazy(() => import('./ApexChart'));

export const ChartSectionBar: FC = () => {
  const scores = useStore((s) => s.scores);
  const settings = useStore((s) => s.settings);

  const [chartUsed, setChartUsed] = useState<ChartUsedType>({
    bar: false,
    polar: false,
    radar: false,
  });

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dataToUse: any = getChartData(scores, settings.numberFormat);

  const radarCategories = __.uniq(
    __.flattenDeep(scores.map((subject) => subject.scores.map((score) => Math.round(score.value))))
  ).sort();

  const srs: Record<string, ApexAxisChartSeries | ApexNonAxisChartSeries> = {
    column: [{ name: t('average score short'), data: dataToUse }],
    polar: __.map(dataToUse, (_) => +(_.average.total / _.average.count).toFixed(2)),
    radar: scores.map((subject) => ({
      name: subject.name,
      data: radarCategories.map((cate) =>
        __.map(subject.scores, 'value').reduce((prev, score) => prev + +(Math.round(score) === cate), 0)
      ),
    })),
  };

  const opts: Record<string, ApexCharts.ApexOptions> = {
    column: {
      ...columnDefaultOptions,
      legend: { customLegendItems: [t('average score'), t('expected')] },
    },
    polar: { ...polarDefaultOptions, labels: __.map(scores, 'name') },
    radar: { ...radarDefaultOptions, xaxis: { categories: radarCategories } },
  };

  if (!scores.length)
    return (
      <div className="flexcentercol typo-med relative mx-auto my-12 w-full !justify-start py-20 text-white medtab:w-[70%]">
        <div className="typo-semism p-6 text-center font-semibold">{t('add scores and the chart will be shown')}</div>
        <Button
          content="Add scores"
          before={false}
          className="group !bg-gradient-to-br from-violet-500 to-violet-800 !text-white"
          onClick={() => navigate('/subjects')}
        >
          <ArrowRightIcon className="isAnimated group-hover:translate-x-2" width="24" height="24" />
        </Button>
      </div>
    );

  return (
    <div className="my-[2rem] mb-[7rem] w-full">
      <div className="flexcenter w-full flex-wrap gap-4 px-4">
        <BackIcon className="scale-75 text-white" onClick={() => (navigate('/'), scrollToTop())} />
        <Title Icon={ChartIcon} content="Analytics" />
        <div className="flexcenter flex-wrap gap-4 medmb:px-4 medmb:py-8">
          <ChartFilter
            active={chartUsed.bar}
            content="bar chart"
            onClick={() => setChartUsed((s) => ({ ...s, bar: !s.bar }))}
          />
          <ChartFilter
            active={chartUsed.polar}
            content="polar chart"
            onClick={() => setChartUsed((s) => ({ ...s, polar: !s.polar }))}
          />
          <ChartFilter
            active={chartUsed.radar}
            content="radar chart"
            onClick={() => setChartUsed((s) => ({ ...s, radar: !s.radar }))}
          />
        </div>
      </div>

      <div className="typo-4sm mx-auto my-8 flex w-full flex-col items-center justify-start gap-20">
        {Object.values(chartUsed).every((_) => !_) && (
          <div className="typo m-4 w-full p-4 text-center font-bold">{t('click the label to see the following chart')}</div>
        )}

        {chartUsed.bar && (
          <Suspense fallback={<InlineLoading />}>
            <ApexChartWrapper data={{ series: srs.column, options: opts.column }} type="bar" />
          </Suspense>
        )}
        {chartUsed.polar && (
          <Suspense fallback={<InlineLoading />}>
            <ApexChartWrapper data={{ series: srs.polar, options: opts.polar }} type="polarArea" />
          </Suspense>
        )}
        {chartUsed.radar && (
          <Suspense fallback={<InlineLoading />}>
            <ApexChartWrapper data={{ series: srs.radar, options: opts.radar }} type="radar" />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ChartSectionBar;
