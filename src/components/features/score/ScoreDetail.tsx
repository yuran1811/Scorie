import { DivProps, ScoreDetailType, SubjectDetailType } from '@/shared';
import { ScoreDetailEdit } from './ScoreDetailEdit';
import { FC, useState } from 'react';

interface ScoreDetailProps {
  subject: SubjectDetailType | undefined;
  score: ScoreDetailType;
  scores: ScoreDetailType[];
}

export const ScoreDetail: FC<ScoreDetailProps & DivProps> = ({ subject, score, scores }) => {
  const [isEdited, setEdited] = useState(false);

  return (
    <>
      <div
        className={`${
          score?.isIgnored ? 'bg-slate-400' : 'bg-indigo-900'
        } w-full max-w-[16rem] cursor-pointer rounded-[1.8rem] px-10 py-4 smmb:p-4`}
        onClick={() => setEdited(true)}
      >
        <div className="typo-2sm line-clamp-2 hidden w-full overflow-hidden text-white smmb:block">{score?.type}</div>
        <div className="typo-xl w-full text-sky-200">{score?.value}</div>
      </div>

      {isEdited && <ScoreDetailEdit score={score} subject={subject} scores={scores} onClick={() => setEdited(false)} />}
    </>
  );
};
