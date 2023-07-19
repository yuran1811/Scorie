import { DivProps, SubjectDetailType } from '@/shared';
import { useStore } from '@/store';
import { averageScore, classnames, getAverageScoreString } from '@/utils';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface SubjectAverageType {
  averageScore: number;
  isLoaded: boolean;
}

export interface SubjectAverageState {
  count: number;
  loaded: number;
  averageScores: {
    name: string;
    score: number;
  }[];
}

export interface SubjectAverageProps {
  subjects?: SubjectDetailType[];
  averageScoreValue?: string | number;
  showStatus?: boolean;
  noStyle?: boolean;
}

export const SubjectAverage: FC<SubjectAverageProps & DivProps> = ({
  className = '',
  subjects = [],
  averageScoreValue = '',
  showStatus = false,
  noStyle = true,
}) => {
  const settings = useStore((s) => s.settings);

  const { t } = useTranslation();

  if ((typeof averageScoreValue === 'string' && averageScoreValue.length > 0) || typeof averageScoreValue === 'number') {
    const status = averageScore.check(Number(averageScoreValue));
    const { color } = averageScore[status];

    return (
      <>
        <div
          className={classnames('my-4 line-clamp-1 w-max max-w-full rounded-[1rem] px-6 text-center text-[7rem]', className)}
          style={noStyle ? {} : { ...averageScore[status] }}
        >
          {averageScoreValue}
        </div>
        {showStatus && (
          <div className="typo-med w-full capitalize" style={noStyle ? {} : { color }}>
            {t(status)}
          </div>
        )}
      </>
    );
  }

  const subjectAverageScore = useMemo(() => {
    const averageScore = subjects.reduce(
      (prevScore, subject) => {
        if (subject.isIgnored || !subject.scores.length) return prevScore;

        const scores = subject.scores.reduce(
          (prevVal, val) => {
            if (val.isIgnored) return prevVal;

            return {
              total: val.value * val.base + prevVal.total,
              count: val.base + prevVal.count,
            };
          },
          { total: 0, count: 0 }
        );

        if (!scores.count) return prevScore;

        return {
          total: scores.total / scores.count + prevScore.total,
          count: prevScore.count + 1,
        };
      },
      { total: 0, count: 0 }
    );

    if (!averageScore.count)
      return {
        total: 0,
        count: 0,
      };

    return averageScore;
  }, [subjects]);

  const { background, color } = useMemo(() => {
    return !subjectAverageScore.count
      ? averageScore.normal
      : averageScore[averageScore.check(subjectAverageScore.total / subjectAverageScore.count)];
  }, [subjectAverageScore]);

  return (
    <div className="flexcentercol pb-6 text-center text-[6.5rem] font-bold medmb:text-[7rem] medtab:text-[8.5rem]">
      {!subjectAverageScore.count ? (
        ''
      ) : (
        <>
          <div className="w-full" style={noStyle ? {} : { color }}>
            {getAverageScoreString(subjectAverageScore, settings.numberFormat)}
          </div>
          {showStatus && (
            <div className="typo-med w-full capitalize" style={noStyle ? {} : { color }}>
              {t(averageScore.check(subjectAverageScore.total / subjectAverageScore.count))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
