import { DivProps, MAX_SCORE_RECENT_LTH, ScoreDetailType, SubjectDetailType } from '@/shared';
import { useStore } from '@/store';
import { averageScore as averageScoreStyle, getAverageScore, getAverageScoreString } from '@/utils';
import { IgnoreIcon, ImportantIcon, StarIcon } from '@cpns/icons';
import { SubjectDetail } from './SubjectDetail';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import 'swiper/css';

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

  useEffect(() => {
    if (!subject?.scores) return;
    setScores([...subject.scores]);
  }, [subject]);

  return (
    <>
      <div
        className={`${
          !isShow ? '!hidden' : ''
        } m-6 w-full cursor-pointer overflow-hidden rounded-[2.5rem] bg-violet-200 p-4 text-center font-bold text-rose-600 tablet:max-w-[25rem]`}
        onClick={() => setOpenDetail((s) => !s)}
      >
        <div className="flexcenter p-4">
          <StarIcon
            className="mx-4"
            fill={subject && !subject.isSpecial ? 'white' : '#d97706'}
            width="30"
            height="30"
          />
          <ImportantIcon
            className="mx-4"
            fill={subject && !subject.isVital ? 'white' : '#57534e'}
            width="30"
            height="30"
          />
          <IgnoreIcon
            className="mx-4"
            fill={subject && !subject.isIgnored ? 'white' : '#0891b2'}
            width="30"
            height="30"
          />
        </div>

        <div className="flexcentercol">
          <div className="w-full text-center text-[3.5rem] font-bold text-teal-700 line-clamp-1">
            {subject?.name || ''}
          </div>
          <div
            className="my-4 rounded-[1rem] px-6 text-center text-[6rem] font-bold line-clamp-1"
            style={{
              ...averageScoreStyle[averageScoreStyle.check(+averageScore)],
            }}
          >
            {averageScore}
          </div>

          {scores.length !== 0 && (
            <div className="w-full px-8 text-left text-[3rem] font-bold text-slate-800 line-clamp-1">
              {t('recent')}
            </div>
          )}

          {scores.length ? (
            <ReactSwiper
              {...swiperOptions}
              className="flex w-full flex-row items-center text-sky-700"
            >
              {scores
                .slice(-MAX_SCORE_RECENT_LTH)
                .reverse()
                .map((_) => (
                  <SwiperSlide key={_.id}>
                    <div className="h-[6rem] w-[7rem] p-3 text-center">{_.value}</div>
                  </SwiperSlide>
                ))}
              {scores.length > MAX_SCORE_RECENT_LTH && (
                <SwiperSlide>
                  <div className="h-[6rem] w-[7rem] p-3 text-center">...</div>
                </SwiperSlide>
              )}
            </ReactSwiper>
          ) : (
            <div className="w-full px-8 text-center text-[3rem] font-semibold text-slate-800 line-clamp-1">
              No record
            </div>
          )}
        </div>
      </div>

      {openDetail && (
        <SubjectDetail
          style={{ ...averageScoreStyle[averageScoreStyle.check(+averageScore)] }}
          scores={scores}
          subject={subject}
          averageScore={averageScore}
          setOpenDetail={setOpenDetail}
        />
      )}
    </>
  );
};
