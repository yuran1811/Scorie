import { deleteNote, editNote, validateNoteOption } from '@/services';
import { NoteDetailType, ToastDefaultConfig } from '@/shared';
import { useStore } from '@/store';
import { shallowObjectCompare } from '@/utils';
import { ArchiveIcon, CloseIcon, DoneIcon, PinIcon, ProgressIcon, TrashIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { ConfirmBox, Input, TextArea, TimeContainer } from '@cpns/shared';
import Tippy from '@tippyjs/react/headless';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Inputs {
  title: string;
  data: string;
}

interface NoteDetailProps {
  note: NoteDetailType;
  noteStyle: {
    backgroundColor: string;
    color: string;
  };
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
}

export const NoteDetail: FC<NoteDetailProps> = ({ note, noteStyle, setOpenDetail }) => {
  const { id, isPinned, isArchived, isDone, isInProgress, title, data, updatedAt } = note;

  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState({ type: 'ok', message: '' });
  const [noteOptions, setNoteOptions] = useState({ isDone, isInProgress, isArchived, isPinned });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const updateNote = useCallback(
    (data: any) => {
      if (!currentUser || !currentUser?.uid || !id) return;

      const checkNoteOpts = validateNoteOption({ ...noteOptions });

      setStatus({ ...checkNoteOpts });

      if (checkNoteOpts.type === 'errors') return;

      if (
        note.title === data.title.trim() &&
        note.data === data.data.trim() &&
        shallowObjectCompare(noteOptions, { isDone, isInProgress, isArchived, isPinned })
      ) {
        setOpenDetail(false);
        return;
      }

      const noteToEdit = {
        ...noteOptions,
        title: data.title.trim(),
        data: data.data.trim(),
      } as NoteDetailType;

      editNote(currentUser.uid, id, noteToEdit)
        .then(() => {
          toast.success(t('successfully'), { ...ToastDefaultConfig, autoClose: 800 });
          setStatus({ type: 'ok', message: 'Update successfully' });
          setOpenDetail(false);
        })
        .catch(() => {
          setStatus({ type: 'errors', message: 'Fail to update' });
        });
    },
    [note, noteOptions]
  );
  const removeNote = () => {
    if (!currentUser || !currentUser?.uid || !id)
      return new Promise((res, rej) => {
        rej('Failed');
      });
    return deleteNote(currentUser.uid, id);
  };

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    updateNote({ ...data });
  };

  return createPortal(
    <form
      className="fullscreen text-center scrollY"
      style={noteStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="sticky top-0 left-0 right-0 flex items-center justify-between p-8"
        style={{ backgroundColor: noteStyle.backgroundColor }}
      >
        <div className="flexcenter flex-wrap w-full mobile:pl-24">
          <PinIcon
            className="scale-75 tablet:scale-100 cursor-pointer mx-3 tablet:mx-6"
            fill={!noteOptions.isPinned ? 'white' : '#f87171'}
            width="40"
            height="40"
            onClick={() =>
              setNoteOptions((s) => ({
                ...s,
                isPinned: !s.isPinned,
                isArchived: !s.isPinned ? false : s.isArchived,
              }))
            }
          />
          <ArchiveIcon
            className="scale-75 tablet:scale-100 cursor-pointer mx-3 tablet:mx-6"
            fill={!noteOptions.isArchived ? 'white' : '#94a3b8'}
            width="40"
            height="40"
            onClick={() =>
              setNoteOptions((s) => ({
                ...s,
                isArchived: !s.isArchived,
                isPinned: !s.isArchived ? false : s.isPinned,
              }))
            }
          />
          <DoneIcon
            className="scale-75 tablet:scale-100 cursor-pointer mx-3 tablet:mx-6"
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
            className="scale-75 tablet:scale-100 cursor-pointer mx-3 tablet:mx-6"
            fill={!noteOptions.isInProgress ? 'white' : '#9ca3af'}
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

          <div className="custom-tippy">
            <Tippy
              interactive
              visible={showConfirm}
              placement="bottom-end"
              render={(attrs) => (
                <ConfirmBox
                  {...attrs}
                  className={showConfirm ? '' : '!hidden z-[-1]'}
                  content='confirm delete note'
                  setConfirm={setShowConfirm}
                  actionWhenConfirm={removeNote}
                />
              )}
            >
              <div onClick={() => setShowConfirm((s) => !s)}>
                <TrashIcon
                  className="scale-75 tablet:scale-100 cursor-pointer mx-3 tablet:mx-6"
                  width="35"
                  height="35"
                />
              </div>
            </Tippy>
          </div>
        </div>

        <button type="submit">
          <CloseIcon className="cursor-pointer mx-4 text-rose-600" width="40" height="40" />
        </button>
      </div>

      {status.type === 'errors' && (
        <ErrorMessage className="p-6 text-[3rem] tablet:text-[4rem]" content={status.message} />
      )}

      <div className="flexcentercol px-8 pb-8 h-[calc(100%-14rem)] tablet:h-[calc(100%-12rem)]">
        <TimeContainer obj={{ updatedAt }} style={noteStyle} />

        <Input
          className="!font-bold !text-[3.5rem] mobile:!text-[4.5rem] text-center !max-w-full tablet:!max-w-[65rem]"
          style={noteStyle}
          defaultValue={title}
          formHandle={{
            ...register('title', {
              validate: {
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid title',
              },
            }),
          }}
        />
        {errors?.title && (
          <ErrorMessage className="text-[3rem]" content={errors.title.message || ''} />
        )}

        <TextArea
          className="!text-[3rem] mobile:!text-[3.5rem] !max-w-full tablet:!max-w-[65rem] text-left px-6 !h-full"
          style={noteStyle}
          defaultValue={data}
          formHandle={{ ...register('data') }}
        />
      </div>
    </form>,
    document.getElementById('modal-container') as HTMLElement
  );
};
