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
        className={`${score?.isIgnored ? 'bg-slate-400' : 'bg-indigo-900'} cursor-pointer rounded-[2rem] px-10 py-4`}
        onClick={() => setEdited(true)}
      >
        <div className="hidden w-full text-[3.5rem] text-white smmb:block">{score?.type}</div>
        <div className="w-full text-[4.5rem] text-sky-200">{score?.value}</div>
      </div>

      {isEdited && <ScoreDetailEdit score={score} subject={subject} scores={scores} onClick={() => setEdited(false)} />}
    </>
  );
};
