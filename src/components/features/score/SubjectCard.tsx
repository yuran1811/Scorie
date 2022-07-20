import { DivProps, MAX_SCORE_RECENT_LTH, ScoreDetailType, SubjectDetailType } from '@/shared';
import { useStore } from '@/store';
import { averageScore as averageScoreStyle, getAverageScore, getAverageScoreString } from '@/utils';
import { IgnoreIcon, ImportantIcon, StarIcon } from '@cpns/icons';
import { SubjectDetail } from './SubjectDetail';
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
        } overflow-hidden cursor-pointer tablet:max-w-[25rem] w-full m-6 p-4 rounded-[2.5rem] font-bold text-center text-rose-600 bg-violet-200`}
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
          <div className="font-bold text-[3.5rem] text-center text-teal-700 w-full line-clamp-1">
            {subject?.name || ''}
          </div>
          <div
            className="font-bold text-[6rem] text-center line-clamp-1 px-6 my-4 rounded-[1rem]"
            style={{
              ...averageScoreStyle[averageScoreStyle.check(+averageScore)],
            }}
          >
            {averageScore}
          </div>

          {scores.length !== 0 && (
            <div className="font-bold text-[3rem] text-slate-800 text-left w-full px-8 line-clamp-1">
              Recents
            </div>
          )}

          {scores.length ? (
            <ReactSwiper
              {...swiperOptions}
              className="flex flex-row items-center w-full text-sky-700"
            >
              {scores
                .slice(-MAX_SCORE_RECENT_LTH)
                .reverse()
                .map((_) => (
                  <SwiperSlide key={_.id}>
                    <div className="w-[7rem] h-[6rem] p-3 text-center">{_.value}</div>
                  </SwiperSlide>
                ))}
              {scores.length > MAX_SCORE_RECENT_LTH && (
                <SwiperSlide>
                  <div className="w-[7rem] h-[6rem] p-3 text-center">...</div>
                </SwiperSlide>
              )}
            </ReactSwiper>
          ) : (
            <div className="font-semibold text-[3rem] text-slate-800 text-center w-full px-8 line-clamp-1">
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
