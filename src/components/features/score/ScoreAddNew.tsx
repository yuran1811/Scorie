import { addNewScore } from '@/services';
import { DivProps, SubjectDetailType } from '@/shared';
import { useStore } from '@/store';
import { IgnoreIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader } from '@cpns/shared';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  score: string;
  base: string;
  type: string;
}

interface ScoreAddNewProps {
  subject: SubjectDetailType | undefined;
}

export const ScoreAddNew: FC<ScoreAddNewProps & DivProps> = ({ subject, onClick }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const [scoreOptions, setScoreOptions] = useState({ isIgnored: false });

  const {
    reset,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!currentUser || !currentUser?.uid || !subject || !subject.id) return;

    const { base, score: value, type } = data;

    const scoreToAdd = {
      id: (subject.scores.length ? +subject.scores[subject.scores.length - 1].id + 1 : 1) + '',
      isIgnored: scoreOptions.isIgnored,
      type: type.trim(),
      base: +base.trim(),
      value: +value.trim(),
    };

    addNewScore(currentUser.uid, subject.id, scoreToAdd);

    reset({ score: '', base: '', type: '' }, { keepErrors: false });
  };

  useEffect(() => {
    return () => {
      unregister('score');
      unregister('base');
      unregister('type');
    };
  }, []);

  return (
    <ModalBox onClick={onClick}>
      <ModalBoxHeader onClick={onClick}>
        <IgnoreIcon
          className="mx-5 aspect-square w-12 cursor-pointer"
          fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
          onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
        />
      </ModalBoxHeader>

      <div className="typo line-clamp-1 w-full text-ctcolor">{t('new record')}</div>
      <form
        className="flexcentercol line-clamp-1 w-full px-8 py-2 text-center font-bold text-ctcolor"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="number"
          inputMode="decimal"
          autoComplete="off"
          placeholder="Score"
          defaultValue=""
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
        {errors?.score && <ErrorMessage content={errors.score.message || ''} />}

        <Input
          type="number"
          inputMode="decimal"
          autoComplete="off"
          placeholder="Base"
          defaultValue=""
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
        {errors?.base && <ErrorMessage content={errors.base.message || ''} />}

        <Input
          placeholder="Type"
          defaultValue=""
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
        {errors?.type && <ErrorMessage content={errors.type.message || ''} />}

        <Button type="submit" content="Add" />
      </form>
    </ModalBox>
  );
};
