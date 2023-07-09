import { addNewNote, updateIdxList, validateNoteOption } from '@/services';
import { DivProps, NoteDetailType } from '@/shared';
import { useNoteStore, useStore } from '@/store';
import { DoneIcon, PinIcon, ProgressIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader, TextArea } from '@cpns/shared';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  title: string;
  data: string;
}

interface NoteAddNewProps {
  onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const NoteAddNew: FC<NoteAddNewProps & DivProps> = ({ onClickHandle }) => {
  const currentUser = useStore((s) => s.currentUser);
  const noteIdxList = useNoteStore((s) => s.noteIdxList);

  const { t } = useTranslation();

  const [status, setStatus] = useState({ type: 'ok', message: '' });
  const [noteOptions, setNoteOptions] = useState({
    isPinned: false,
    isArchived: false,
    isDone: false,
    isInProgress: false,
  });

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const checkNoteOpts = validateNoteOption({ ...noteOptions });

    if (checkNoteOpts.type === 'errors') {
      setStatus({ ...checkNoteOpts });
      return;
    }

    setStatus({ ...checkNoteOpts });
    onClickHandle(false);

    if (currentUser && currentUser?.uid) {
      const noteToAdd = {
        ...noteOptions,
        title: data.title.trim(),
        data: data.data.trim(),
        theme: 'default',
      } as NoteDetailType;

      const { data: resp } = await addNewNote(currentUser.uid, noteToAdd);
      if (resp && resp?.id) {
        await updateIdxList(currentUser.uid, [resp.id, ...noteIdxList.list], noteIdxList.id);
      }
    }
  };

  useEffect(() => {
    return () => {
      unregister('title');
      unregister('data');
    };
  }, []);

  return (
    <ModalBox onClick={() => onClickHandle(false)}>
      <ModalBoxHeader onClick={() => onClickHandle(false)}>
        <PinIcon
          className="mx-5 cursor-pointer"
          fill={!noteOptions.isPinned ? 'white' : '#f87171'}
          width="32"
          height="32"
          onClick={() => setNoteOptions((s) => ({ ...s, isPinned: !s.isPinned }))}
        />
        <DoneIcon
          className="mx-5 cursor-pointer"
          fill={!noteOptions.isDone ? 'white' : '#d97706'}
          width="32"
          height="32"
          onClick={() =>
            setNoteOptions((s) => ({
              ...s,
              isDone: !s.isDone,
              isInProgress: !s.isDone ? false : s.isInProgress,
            }))
          }
        />
        <ProgressIcon
          className="mx-5 cursor-pointer"
          fill={!noteOptions.isInProgress ? 'white' : '#94a3b8'}
          width="32"
          height="32"
          onClick={() =>
            setNoteOptions((s) => ({
              ...s,
              isInProgress: !s.isInProgress,
              isDone: !s.isInProgress ? false : s.isDone,
            }))
          }
        />
      </ModalBoxHeader>

      {status.type === 'errors' && <ErrorMessage className="mx-auto w-4/5 py-5 text-center" content={status.message} />}

      <div className="typo-xl line-clamp-1 w-full">{t('new note')}</div>
      <form
        className="flexcentercol typo-2xl line-clamp-1 w-full p-8 text-center font-bold text-teal-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Title"
          defaultValue=""
          formHandle={{
            ...register('title', {
              validate: {
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid title',
              },
            }),
          }}
        />
        {errors?.title && <ErrorMessage content={errors.title.message || ''} />}

        <TextArea defaultValue="" bothClass="font-normal" formHandle={{ ...register('data') }} />

        <Button type="submit" content="Add" />
      </form>
    </ModalBox>
  );
};
