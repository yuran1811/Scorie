import { editSubject } from '@/services';
import { DivProps, ScoreDetailType, SubjectDetailType, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { IgnoreIcon, TrashIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, ConfirmBox, Input, ModalBox, ModalBoxHeader, TimeContainer } from '@cpns/shared';
import Tippy from '@tippyjs/react/headless';
import { Timestamp } from 'firebase/firestore';
import { FC, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Inputs {
  score: string;
  base: string;
  type: string;
}

interface ScoreDetailProps {
  score: ScoreDetailType;
  subject: SubjectDetailType | undefined;
  scores: ScoreDetailType[];
}

export const ScoreDetailEdit: FC<ScoreDetailProps & DivProps> = ({
  subject,
  score,
  scores,
  onClick,
}) => {
  const currentUser = useStore((s) => s.currentUser);

  const [showConfirm, setShowConfirm] = useState(false);
  const [scoreOptions, setScoreOptions] = useState({
    isIgnored: score && score?.isIgnored ? score.isIgnored : false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const removeScoreRecord = useCallback(() => {
    if (!currentUser || !currentUser?.uid || !subject?.id || !subject?.scores)
      return new Promise((res, rej) => {
        rej('Failed');
      });

    const scoreIdx = scores.findIndex((_) => _.id === score.id);
    const newscores = [...scores];

    newscores.splice(scoreIdx, 1);

    return editSubject(currentUser.uid, subject.id, { scores: [...newscores] });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (
        !currentUser ||
        !currentUser?.uid ||
        !subject?.id ||
        !scores.length ||
        !score ||
        !score?.id
      )
        return;

      const { base, score: value, type } = data;

      const prevScore = scores.find((_) => _.id === score.id);
      const scoreIdx = scores.findIndex((_) => _.id === score.id);
      const newscores = [...scores];

      const scoreToEdit = {
        ...prevScore,
        id: score.id,
        isIgnored: scoreOptions.isIgnored,
        type: type.trim(),
        base: +base.trim(),
        value: +value.trim(),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      newscores.splice(scoreIdx, 1, scoreToEdit);

      editSubject(currentUser.uid, subject.id, { scores: [...newscores] }).then(() =>
        toast.success('Successfully !', { ...ToastDefaultConfig, autoClose: 800 })
      );
    },
    [scoreOptions]
  );

  return (
    <ModalBox onClick={onClick}>
      <ModalBoxHeader onClick={onClick}>
        <IgnoreIcon
          className="cursor-pointer m-[0.6rem] mx-4 mobile:m-5"
          fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
          width="40"
          height="40"
          onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
        />
        <div className="custom-tippy">
          <Tippy
            interactive
            visible={showConfirm}
            placement="bottom-end"
            render={(attrs) => (
              <ConfirmBox
                {...attrs}
                className={showConfirm ? '' : '!hidden z-[-1]'}
                content={'confirm delete score'}
                setConfirm={setShowConfirm}
                actionWhenConfirm={removeScoreRecord}
              />
            )}
          >
            <div onClick={() => setShowConfirm((s) => !s)}>
              <TrashIcon
                className="cursor-pointer m-[0.6rem] mx-4 mobile:m-5 text-slate-500"
                width="40"
                height="40"
              />
            </div>
          </Tippy>
        </div>
      </ModalBoxHeader>

      <TimeContainer
        obj={{
          createdAt: score?.createdAt,
          updatedAt: score?.updatedAt,
        }}
      />

      <form
        className="flexcentercol p-8 font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Score"
          defaultValue={score?.value || ''}
          formHandle={{
            ...register('score', {
              required: 'Please fill in this field',
              validate: {
                notEmpty: (v) => v.trim().length !== 0 || 'Score cannot be empty',
                isValid: (v) => /^(\d+)(\.\d+)?$/.test(v.trim()) || 'Invalid score',
              },
            }),
          }}
        />
        {errors?.score && (
          <ErrorMessage className="text-[3rem]" content={errors.score.message || ''} />
        )}

        <Input
          placeholder="Base"
          defaultValue={score?.base || ''}
          formHandle={{
            ...register('base', {
              required: 'Please fill in this field',
              validate: {
                notEmpty: (v) => v.trim().length !== 0 || 'Base cannot be empty',
                isValid: (v) => /^\d+$/.test(v.trim()) || 'Invalid base',
              },
            }),
          }}
        />
        {errors?.base && (
          <ErrorMessage className="text-[3rem]" content={errors.base.message || ''} />
        )}

        <Input
          placeholder="Type"
          defaultValue={score?.type || ''}
          formHandle={{
            ...register('type', {
              required: 'Please fill in this field',
              validate: {
                notEmpty: (v) => v.trim().length !== 0 || 'Type cannot be empty',
                isValid: (v) => /[\w\d\s]+/.test(v.trim()) || 'Invalid type',
              },
            }),
          }}
        />
        {errors?.type && (
          <ErrorMessage className="text-[3rem]" content={errors.type.message || ''} />
        )}

        <Button className="!text-[3.2rem]" type="submit" content="Update" />
      </form>
    </ModalBox>
  );
};
