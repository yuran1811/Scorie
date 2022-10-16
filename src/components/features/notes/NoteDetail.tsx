import { deleteNote, editNote, validateNoteOption } from '@/services';
import { NoteDetailType } from '@/shared';
import { useNoteStore, useStore } from '@/store';
import { shallowObjectCompare, successToast } from '@/utils';
import { ArchiveIcon, CloseIcon, DoneIcon, PinIcon, ProgressIcon, TrashIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { ConfirmBox, Input, TextArea, TimeContainer } from '@cpns/shared';
import Tippy from '@tippyjs/react/headless';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const noteIdxList = useNoteStore((s) => s.noteIdxList);

  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState({ type: 'ok', message: '' });
  const [noteOptions, setNoteOptions] = useState({ isDone, isInProgress, isArchived, isPinned });

  const {
    register,
    unregister,
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
          successToast();
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
    if (!currentUser || !currentUser?.uid || !id) return new Promise((res, rej) => rej('Failed'));
    return deleteNote(currentUser.uid, id, noteIdxList.id);
  };

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    updateNote({ ...data });
  };

  useEffect(() => {
    return () => {
      unregister('title');
      unregister('data');
    };
  }, []);

  return createPortal(
    <form
      className="fullscreen scrollY text-center"
      style={noteStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="sticky top-0 left-0 right-0 flex items-center justify-between p-8"
        style={{ backgroundColor: noteStyle.backgroundColor }}
      >
        <div className="flexcenter w-full flex-wrap mobile:pl-24">
          <PinIcon
            className="mx-3 scale-75 cursor-pointer tablet:mx-6 tablet:scale-100"
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
            className="mx-3 scale-75 cursor-pointer tablet:mx-6 tablet:scale-100"
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
            className="mx-3 scale-75 cursor-pointer tablet:mx-6 tablet:scale-100"
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
            className="mx-3 scale-75 cursor-pointer tablet:mx-6 tablet:scale-100"
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
                  className={showConfirm ? '' : 'z-[-1] !hidden'}
                  content="confirm delete note"
                  setConfirm={setShowConfirm}
                  actionWhenConfirm={removeNote}
                />
              )}
            >
              <div onClick={() => setShowConfirm((s) => !s)}>
                <TrashIcon
                  className="mx-3 scale-75 cursor-pointer tablet:mx-6 tablet:scale-100"
                  width="35"
                  height="35"
                />
              </div>
            </Tippy>
          </div>
        </div>

        <button type="submit">
          <CloseIcon className="mx-4 cursor-pointer text-rose-600" width="40" height="40" />
        </button>
      </div>

      {status.type === 'errors' && <ErrorMessage className="p-6" content={status.message} />}

      <div className="flexcentercol h-[calc(100%-14rem)] px-8 pb-8 tablet:h-[calc(100%-12rem)]">
        <TimeContainer obj={{ updatedAt }} style={noteStyle} />

        <Input
          className="!max-w-full !rounded-[0.8rem] !border-2 text-center !text-[3rem] !font-bold mobile:!text-[3.5rem]
          tablet:!max-w-[100rem]"
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
        {errors?.title && <ErrorMessage content={errors.title.message || ''} />}

        <TextArea
          className="!h-full !max-w-full !rounded-[0.8rem] !border-2 px-6 text-left !text-[2.5rem] mobile:!text-[3rem]
          tablet:!max-w-[100rem]"
          style={noteStyle}
          defaultValue={data}
          formHandle={{ ...register('data') }}
        />
      </div>
    </form>,
    document.getElementById('modal-container') as HTMLElement
  );
};
