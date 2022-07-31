import { ScoreDetailType, SubjectDetailType } from '@/shared';
import { ScoreDetail } from './ScoreDetail';
import { FC } from 'react';

interface ScoreContainerProps {
  viewMode: string;
  typeList: string[];
  scores: ScoreDetailType[];
  subject: SubjectDetailType | undefined;
}

export const ScoreContainer: FC<ScoreContainerProps> = ({
  viewMode,
  subject,
  typeList,
  scores,
}) => (
  <>
    {viewMode === 'all' && (
      <>
        {subject &&
          subject.scores.map((score) => (
            <div key={score.id} className="m-3 rounded-[2rem] bg-indigo-900 sm:m-6">
              <ScoreDetail score={score} subject={subject} scores={scores} />
            </div>
          ))}
      </>
    )}

    {viewMode === 'group' && (
      <>
        {typeList.map((_) => (
          <div key={_} className="mt-6 mb-16 w-full">
            <div className="ml-6 w-full border-l-[1rem] border-current text-left indent-[3rem] text-[4rem]">
              {_}
            </div>
            <div className="flexcenter ml-6 w-full flex-wrap !justify-start">
              {subject &&
                subject.scores
                  .filter((score) => score.type === _)
                  .map((score) => (
                    <div key={score.id} className="m-3 rounded-[2rem] bg-indigo-900 sm:m-6">
                      <ScoreDetail score={score} subject={subject} scores={scores} />
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </>
    )}
  </>
);
