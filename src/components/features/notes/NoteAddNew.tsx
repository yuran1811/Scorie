import { addNewNote, updateIdxList, validateNoteOption } from '@/services';
import { DivProps, NoteDetailType } from '@/shared';
import { useStore } from '@/store';
import { DoneIcon, PinIcon, ProgressIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader, TextArea } from '@cpns/shared';
import { Dispatch, FC, SetStateAction, useState } from 'react';
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
  const noteIdxList = useStore((s) => s.noteIdxList);

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

  return (
    <ModalBox onClick={() => onClickHandle(false)}>
      <ModalBoxHeader onClick={() => onClickHandle(false)}>
        <PinIcon
          className="mx-5 cursor-pointer"
          fill={!noteOptions.isPinned ? 'white' : '#f87171'}
          width="40"
          height="40"
          onClick={() => setNoteOptions((s) => ({ ...s, isPinned: !s.isPinned }))}
        />
        <DoneIcon
          className="mx-5 cursor-pointer"
          fill={!noteOptions.isDone ? 'white' : '#d97706'}
          width="40"
          height="40"
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
          fill={!noteOptions.isInProgress ? 'white' : '#57534e'}
          width="40"
          height="40"
          onClick={() =>
            setNoteOptions((s) => ({
              ...s,
              isInProgress: !s.isInProgress,
              isDone: !s.isInProgress ? false : s.isDone,
            }))
          }
        />
      </ModalBoxHeader>

      {status.type === 'errors' && (
        <ErrorMessage className="mx-auto w-4/5 py-5 text-center" content={status.message} />
      )}

      <div className="w-full text-[4rem] text-indigo-900 line-clamp-1">{t('new note')}</div>
      <form
        className="flexcentercol w-full p-8 text-center text-[5rem] font-bold text-teal-700 line-clamp-1"
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

        <TextArea defaultValue="" className="font-normal" formHandle={{ ...register('data') }} />

        <Button className="!text-[3rem]" type="submit" content="Add" />
      </form>
    </ModalBox>
  );
};
