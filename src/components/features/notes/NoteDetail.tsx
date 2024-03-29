import { deleteNote, editNote, validateNoteOption } from '@/services';
import { NoteDetailType } from '@/shared';
import { useNoteStore, useStore } from '@/store';
import { classnames, getThemeStyle, invertThemeStyle, mdConvert, shallowObjectCompare, successToast } from '@/utils';
import { ArchiveIcon, CloseIcon, DoneIcon, InfoIcon, PinIcon, ProgressIcon, TrashIcon } from '@cpns/icons';
import { ErrorMessage } from '@cpns/interfaces';
import { ConfirmBox, InlineLoading, Input, TextArea, TimeContainer, Tooltip } from '@cpns/shared';
import { Tab } from '@headlessui/react';
import Tippy from '@tippyjs/react/headless';
import { FC, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { NoteNotFound } from './NoteError';
import { NoteHelp } from './NoteHelp';

interface Inputs {
  title: string;
  data: string;
}

interface NoteDetailInfoProps {
  noteData: NoteDetailType;
}

export const NoteDetail: FC = () => {
  const notes = useNoteStore((s) => s.notes);

  const { noteId } = useParams();

  const thisNote = notes.find((_) => _.id === noteId);
  if (!thisNote) return <NoteNotFound />;

  return <NoteDetailInfo noteData={thisNote} />;
};

export const NoteDetailInfo: FC<NoteDetailInfoProps> = ({ noteData: thisNote }) => {
  const currentUser = useStore((s) => s.currentUser);
  const noteIdxList = useNoteStore((s) => s.noteIdxList);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id, isPinned, isArchived, isDone, isInProgress, title, data, updatedAt, theme } = thisNote;

  const noteStyle = getThemeStyle(theme);

  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState({ type: 'ok', message: '' });
  const [noteOptions, setNoteOptions] = useState({ isDone, isInProgress, isArchived, isPinned });

  const {
    register,
    unregister,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      title: thisNote?.title || '',
      data: thisNote?.data || '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    updateNote({ ...data });
  };

  const removeNote = async () => {
    if (!currentUser || !currentUser?.uid || !id) return;
    await deleteNote(currentUser.uid, id, noteIdxList.id);
    navigate('/notes');
  };

  const updateNote = useCallback(
    (data: any) => {
      if (!currentUser || !currentUser?.uid || !id) return;

      const checkNoteOpts = validateNoteOption({ ...noteOptions });

      setStatus({ ...checkNoteOpts });

      if (checkNoteOpts.type === 'errors') return;

      if (
        thisNote.title === data.title.trim() &&
        thisNote.data === data.data.trim() &&
        shallowObjectCompare(noteOptions, { isDone, isInProgress, isArchived, isPinned })
      ) {
        navigate('/notes');
        return;
      }

      const noteToEdit = {
        ...noteOptions,
        title: data.title.trim(),
        data: data.data.trim(),
      } as NoteDetailType;

      setLoading(true);
      editNote(currentUser.uid, id, noteToEdit)
        .then(() => {
          successToast();
          setStatus({ type: 'ok', message: 'Update successfully' });
          navigate('/notes');
        })
        .catch(() => {
          setStatus({ type: 'errors', message: 'Fail to update' });
        })
        .finally(() => setLoading(false));
    },
    [currentUser, noteIdxList, noteOptions],
  );

  useEffect(() => {
    return () => {
      unregister('title');
      unregister('data');
    };
  }, []);

  return createPortal(
    <form
      className="fullscreen flex flex-col items-center justify-between px-6 pb-6 text-center medtab:px-16"
      style={noteStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="flexcenter sticky left-0 top-0 z-[100] mb-2 w-full px-4 py-8"
        style={{ backgroundColor: noteStyle.backgroundColor }}
      >
        <div className="flexcenter w-full flex-wrap">
          <Tooltip content="help">
            <InfoIcon
              className="mx-3 aspect-square w-12 scale-75 cursor-pointer medtab:mx-6 medtab:scale-100"
              fill="white"
              onClick={() => setShowHelp((s) => !s)}
            />
          </Tooltip>
          <PinIcon
            className="mx-3 aspect-square w-12 scale-75 cursor-pointer medtab:mx-6 medtab:scale-100"
            fill={!noteOptions.isPinned ? 'white' : '#f87171'}
            onClick={() =>
              setNoteOptions((s) => ({
                ...s,
                isPinned: !s.isPinned,
                isArchived: !s.isPinned ? false : s.isArchived,
              }))
            }
          />
          <ArchiveIcon
            className="mx-3 aspect-square w-12 scale-75 cursor-pointer medtab:mx-6 medtab:scale-100"
            fill={!noteOptions.isArchived ? 'white' : '#94a3b8'}
            onClick={() =>
              setNoteOptions((s) => ({
                ...s,
                isArchived: !s.isArchived,
                isPinned: !s.isArchived ? false : s.isPinned,
              }))
            }
          />
          <DoneIcon
            className="mx-3 aspect-square w-12 scale-75 cursor-pointer medtab:mx-6 medtab:scale-100"
            fill={!noteOptions.isDone ? 'white' : '#d97706'}
            onClick={() =>
              setNoteOptions((s) => ({
                ...s,
                isDone: !s.isDone,
                isInProgress: !s.isDone ? false : s.isInProgress,
              }))
            }
          />
          <ProgressIcon
            className="mx-3 aspect-square w-12 scale-75 cursor-pointer medtab:mx-6 medtab:scale-100"
            fill={!noteOptions.isInProgress ? 'white' : '#9ca3af'}
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
                  actionStyle="danger"
                  actionWhenConfirm={removeNote}
                  setConfirm={setShowConfirm}
                />
              )}
            >
              <div onClick={() => setShowConfirm((s) => !s)}>
                <TrashIcon className="mx-3 aspect-square w-12 scale-75 cursor-pointer medtab:mx-6 medtab:scale-100" />
              </div>
            </Tippy>
          </div>
        </div>

        <button type="submit">
          <CloseIcon className="mr-4 aspect-square w-12 cursor-pointer text-rose-500" />
        </button>
      </div>

      <TimeContainer className="itypo-3sm font-semibold" obj={{ updatedAt }} style={noteStyle} />
      {loading && <InlineLoading />}

      {status.type === 'errors' && <ErrorMessage className="p-6" content={status.message} />}

      <div className="mx-auto flex h-full w-full max-w-[90rem] flex-col items-center justify-start text-left medmb:px-8">
        <Input
          className="itypo-2sm mt-4 !max-w-full !rounded-[0] !border-0 !p-0 !font-bold"
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

        <div className="typo-3sm relative h-[calc(100%)] w-full">
          <Tab.Group>
            <Tab.List className="absolute right-0 top-0 z-[1] font-semibold">
              {['content', 'preview'].map((_) => (
                <Tab
                  key={_}
                  className={({ selected }) =>
                    classnames(
                      'isAnimated typo-4sm w-max rounded-lg px-4 py-2.5',
                      'opacity-20 hover:opacity-100',
                      selected && 'hidden',
                    )
                  }
                  style={invertThemeStyle(noteStyle)}
                >
                  {t(_)}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2 overflow-y-auto">
              <Tab.Panel className="h-[calc(100vh-18rem)] w-full">
                <TextArea
                  textareaClass="itypo-3sm"
                  bothClass="!m-0 !h-full !w-full !max-w-full !resize-none !rounded-[0] !border-0 !p-0"
                  style={noteStyle}
                  defaultValue={data}
                  formHandle={{ ...register('data') }}
                  showIndicator={false}
                />
              </Tab.Panel>
              <Tab.Panel className="h-[calc(100vh-18rem)] w-full">
                <div
                  className="typo-3sm mdformat prose relative h-full min-h-[8rem] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: mdConvert.render(watch('data') || '') }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      {showHelp && <NoteHelp onClick={() => setShowHelp(false)} />}
    </form>,
    document.getElementById('modal-container') as HTMLElement,
  );
};
