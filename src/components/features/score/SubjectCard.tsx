import { DivProps, ScoreDetailType, SubjectDetailType } from '@/shared';
import { useStore } from '@/store';
import { averageScore as averageScoreStyle, getAverageScore, getAverageScoreString } from '@/utils';
import { IgnoreIcon, ImportantIcon, StarIcon } from '@cpns/icons';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { A11y } from 'swiper';
import 'swiper/css';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { SubjectDetail } from './SubjectDetail';

interface SubjectCardProps {
  isShow: boolean;
  subject: SubjectDetailType;
}

const swiperOptions: SwiperProps = {
  modules: [A11y],
  centeredSlides: false,
  breakpoints: {
    640: { slidesPerView: 3 },
    420: { slidesPerView: 5 },
    0: { slidesPerView: 3 },
  },
};

export const SubjectCard: FC<SubjectCardProps & DivProps> = ({ isShow, subject }) => {
  const settings = useStore((s) => s.settings);

  const { t } = useTranslation();

  const [scores, setScores] = useState<ScoreDetailType[]>([] as ScoreDetailType[]);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const averageScore = useMemo(() => {
    if (!scores || !scores.length) return '';

    const averageScoreRaw = getAverageScore(scores);
    const averageScoreString = getAverageScoreString(averageScoreRaw, settings.numberFormat);

    return averageScoreString;
  }, [scores, settings.numberFormat]);

  const averScoreType = useMemo(() => {
    return averageScoreStyle[averageScoreStyle.check(+averageScore, subject?.maxScore || 10)];
  }, [averageScore, subject]);

  useEffect(() => {
    if (!subject?.scores) return;
    setScores([...subject.scores]);
  }, [subject]);

  return (
    <>
      <div
        className={`${
          !isShow ? '!hidden' : ''
        } m-6 w-full cursor-pointer overflow-hidden rounded-[2.5rem] bg-ctbg p-4 text-center font-bold text-ctcolor smtab:max-w-[25rem]`}
        onClick={() => setOpenDetail((s) => !s)}
      >
        <div className="flexcenter p-4">
          <StarIcon className="mx-4" fill={subject && !subject.isSpecial ? 'white' : '#d97706'} width="30" height="30" />
          <ImportantIcon className="mx-4" fill={subject && !subject.isVital ? 'white' : '#94a3b8'} width="30" height="30" />
          <IgnoreIcon className="mx-4" fill={subject && !subject.isIgnored ? 'white' : '#0891b2'} width="30" height="30" />
        </div>

        <div className="flexcentercol">
          <div className="typo-lg line-clamp-2 w-full text-center font-bold text-ctcolor">{subject?.name || ''}</div>
          <div
            className="my-4 line-clamp-1 max-w-full rounded-[1rem] border-4 border-violet-200 px-6 text-center text-[4rem] font-bold"
            style={{ ...averScoreType }}
          >
            {averageScore}
          </div>

          {scores.length !== 0 && (
            <div className="typo-sm line-clamp-1 w-full px-4 text-left font-bold text-violet-200">{t('recent')}</div>
          )}

          {scores.length ? (
            <ReactSwiper {...swiperOptions} className="text-[2.4rem] flex w-full flex-row items-center text-ctcolor">
              {scores
                .slice(-settings.maxRecentScoreNum)
                .reverse()
                .map((_) => (
                  <SwiperSlide key={_.id}>
                    <div className="h-[5.3rem] w-[7rem] p-3 text-center">{_.value}</div>
                  </SwiperSlide>
                ))}
              {scores.length > settings.maxRecentScoreNum && (
                <SwiperSlide>
                  <div className="h-[5.3rem] w-[7rem] p-3 text-center">...</div>
                </SwiperSlide>
              )}
            </ReactSwiper>
          ) : (
            <div className="typo-3sm m-4 w-full p-8 text-center font-bold">{t('no record')}</div>
          )}
        </div>
      </div>

      {openDetail && (
        <SubjectDetail
          style={{ ...averScoreType }}
          scores={scores}
          subject={subject}
          averageScore={averageScore}
          setOpenDetail={setOpenDetail}
        />
      )}
    </>
  );
};
