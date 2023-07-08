import { addNewScore, addNewSubject } from '@/services';
import { DivProps, SubjectListType } from '@/shared';
import { useStore } from '@/store';
import { IgnoreIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader } from '@cpns/shared';
import { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  subject: string;
  score: string;
  base: string;
  type: string;
}

interface ScoreSubjectAddNewProps {
  subjects: SubjectListType[];
}

export const ScoreSubjectAddNew: FC<ScoreSubjectAddNewProps & DivProps> = ({ onClick, subjects }) => {
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

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (!currentUser || !currentUser?.uid) return;

      const { base, score: value, type, subject } = data;

      const validSubject = subjects.find((_) => _.subject.name === subject.trim());
      if (!validSubject) {
        addNewSubject(currentUser.uid, {
          name: subject.trim(),
          isSpecial: false,
          isVital: false,
          isIgnored: false,
          scores: [
            {
              id: '1',
              isIgnored: scoreOptions.isIgnored,
              type: type.trim(),
              base: +base.trim(),
              value: +value.trim(),
            },
          ],
        });
      } else {
        addNewScore(currentUser.uid, validSubject.subject.id, {
          id: +validSubject.subject.scores[validSubject.subject.scores.length - 1].id + 1 + '',
          isIgnored: scoreOptions.isIgnored,
          type: type.trim(),
          base: +base.trim(),
          value: +value.trim(),
        });
      }

      reset({ score: '', base: '', type: '' }, { keepErrors: false });
    },
    [scoreOptions, subjects]
  );

  useEffect(() => {
    return () => {
      unregister('subject');
      unregister('score');
      unregister('base');
      unregister('type');
    };
  }, []);

  return (
    <ModalBox onClick={onClick}>
      <ModalBoxHeader onClick={onClick}>
        <IgnoreIcon
          className="mx-5 cursor-pointer"
          fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
          width="40"
          height="40"
          onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
        />
      </ModalBoxHeader>

      <div className="line-clamp-1 w-full text-[4rem] text-indigo-900">{t('new record')}</div>
      <form
        className="flexcentercol line-clamp-1 w-full p-8 text-center text-[5rem] font-bold text-teal-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Subject"
          defaultValue=""
          formHandle={{
            ...register('subject', {
              required: 'Please fill in this field',
              validate: {
                notEmpty: (v) => v.trim().length !== 0 || 'Subject cannot be empty',
                isValid: (v) => /[\w\d\s]+/.test(v.trim()) || 'Invalid subject',
              },
            }),
          }}
        />
        {errors?.subject && <ErrorMessage content={errors.subject.message || ''} />}

        <Input
          placeholder="Score"
          defaultValue=""
          inputMode="decimal"
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
          placeholder="Base"
          defaultValue=""
          inputMode="decimal"
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

        <Button className="!text-[3rem]" type="submit" content="Add" />
      </form>
    </ModalBox>
  );
};
