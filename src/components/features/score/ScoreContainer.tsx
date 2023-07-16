import { ScoreDetailType, SubjectDetailType } from '@/shared';
import { ScoreDetail } from './ScoreDetail';
import { FC } from 'react';

interface ScoreContainerProps {
  viewMode: string;
  typeList: string[];
  scores: ScoreDetailType[];
  subject: SubjectDetailType | undefined;
}

export const ScoreContainer: FC<ScoreContainerProps> = ({ viewMode, subject, typeList, scores }) => (
  <>
    {viewMode === 'all' && (
      <>
        {subject &&
          subject.scores.map((score) => (
            <div key={score.id} className="m-3 rounded-[2rem] bg-indigo-900 medtab:m-4">
              <ScoreDetail score={score} subject={subject} scores={scores} />
            </div>
          ))}
      </>
    )}

    {viewMode === 'group' && (
      <>
        {typeList.map((_) => (
          <div key={_} className="mb-16 mt-6 w-full">
            <div className="typo-sm ml-6 w-full border-l-4 border-current text-left indent-8">{_}</div>
            <div className="flexcenter ml-6 w-full flex-wrap !justify-start">
              {subject &&
                subject.scores
                  .filter((score) => score.type === _)
                  .map((score) => (
                    <div key={score.id} className="m-3 rounded-[2rem] bg-indigo-900 medtab:m-4">
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
