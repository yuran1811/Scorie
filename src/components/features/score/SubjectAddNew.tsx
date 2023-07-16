import { addNewSubject, validateSubjectOption } from '@/services';
import { DivProps, SubjectListType, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { IgnoreIcon, ImportantIcon, StarIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader } from '@cpns/shared';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Inputs {
  subject: string;
}

interface ScoreAddNewProps {
  subjects: SubjectListType[];
  onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const SubjectAddNew: FC<ScoreAddNewProps & DivProps> = ({ subjects, onClickHandle }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const toastId = useRef<any>(null);

  const [status, setStatus] = useState({ type: 'ok', message: '' });
  const [subjectOptions, setSubjectOptions] = useState({
    isIgnored: false,
    isSpecial: false,
    isVital: false,
  });

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    ({ subject }) => {
      if (validateSubjectOption(subjectOptions)) {
        setStatus({
          type: 'errors',
          message: 'Subject cannot be both ignored and vital (or special)',
        });

        return;
      }

      onClickHandle(false);
      setStatus({
        type: 'ok',
        message: 'Alright',
      });

      if (currentUser && currentUser?.uid) {
        const notUnique = subjects.find((_) => _.subject.name === subject);
        if (notUnique) return;

        addNewSubject(currentUser.uid, {
          ...subjectOptions,
          name: subject.trim(),
          scores: [],
        });
      }
    },
    [subjectOptions, subjects]
  );

  useEffect(() => {
    if (status.message.length)
      toastId.current = toast.error(status.message, {
        ...ToastDefaultConfig,
        toastId: status.message,
        autoClose: false,
        closeButton: false,
        draggable: false,
      });

    return () => {
      toast.update(toastId.current, { autoClose: 1 });
    };
  }, [status]);

  useEffect(() => {
    return () => {
      unregister('subject');
    };
  }, []);

  return (
    <ModalBox onClick={() => onClickHandle(false)}>
      <ModalBoxHeader onClick={() => onClickHandle(false)}>
        <StarIcon
          className="m-[0.6rem] mx-4 cursor-pointer lgmb:m-5"
          fill={!subjectOptions.isSpecial ? 'white' : '#d97706'}
          width="32"
          height="32"
          onClick={() => setSubjectOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
        />
        <ImportantIcon
          className="m-[0.6rem] mx-4 cursor-pointer lgmb:m-5"
          fill={!subjectOptions.isVital ? 'white' : '#94a3b8'}
          width="32"
          height="32"
          onClick={() => setSubjectOptions((s) => ({ ...s, isVital: !s.isVital }))}
        />
        <IgnoreIcon
          className="m-[0.6rem] mx-4 cursor-pointer lgmb:m-5"
          fill={!subjectOptions.isIgnored ? 'white' : '#0891b2'}
          width="32"
          height="32"
          onClick={() => setSubjectOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
        />
      </ModalBoxHeader>

      <div className="typo line-clamp-1 w-full">{t('new subject')}</div>
      <form
        className="flexcentercol line-clamp-1 w-full px-8 py-2 text-center font-bold text-teal-700"
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

        <Button type="submit" content="Add" />
      </form>
    </ModalBox>
  );
};
