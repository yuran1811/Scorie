import { editNote } from '@/services';
import { NoteItemProps } from '@/shared';
import { useStore } from '@/store';
import { copySuccessToast, copyToClipboard, getThemeStyle, shallowObjectCompare } from '@/utils';
import {
  ArchiveIcon,
  DoneIcon,
  NodeShareIcon,
  PaletteIcon,
  PinIcon,
  ProgressIcon
} from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import Tippy from '@tippyjs/react/headless';
import { FC, useEffect, useState } from 'react';
import { NoteDetail } from './NoteDetail';
import { ThemePanel } from './ThemePanel';

const toolClass = 'isAnimated m-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100';
const toolProps = { width: '30', height: '30', fill: 'white' };

export const NoteItem: FC<NoteItemProps> = ({ viewMode, isShow, note }) => {
  const { id, title, data, isPinned, isArchived, isDone, isInProgress, theme } = note;
  const noteStyle = getThemeStyle(theme);

  const currentUser = useStore((s) => s.currentUser);

  const [openTheme, setOpenTheme] = useState(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [newTheme, setNewTheme] = useState(theme || 'default');
  const [noteOpts, setNoteOpts] = useState({ isDone, isInProgress, isArchived, isPinned });

  const shareNotify = () => copySuccessToast();

  useEffect(() => {
    if (!currentUser || !currentUser?.uid || !id) return;
    if (note.theme !== newTheme) editNote(currentUser.uid, id, { theme: newTheme });
  }, [newTheme]);

  useEffect(() => {
    if (!currentUser || !currentUser?.uid || !id) return;

    if (
      !shallowObjectCompare(noteOpts, {
        isDone,
        isInProgress,
        isArchived,
        isPinned,
      })
    ) {
      editNote(currentUser.uid, id, { ...noteOpts });
    }
  }, [noteOpts]);

  return (
    <>
      <div
        className={`${
          viewMode === 'list' ? 'mx-auto w-full mobile:max-w-[calc(100%-4rem)]' : 'w-[20rem]'
        } ${
          !isShow && '!hidden'
        } isAnimated flexcentercol group relative max-h-[35rem] cursor-pointer rounded-[2rem] border-[3px] border-transparent p-4 hover:border-white mobile:!mx-0 mobile:!max-w-none 
        tablet:w-[24rem]`}
        style={noteStyle}
        onClick={() => setOpenDetail(true)}
      >
        <div className="flexcenter">
          {isPinned && <PinIcon className="mx-5" width="30" height="30" fill="#f87171" />}
          {isDone && <DoneIcon className="mx-4" width="30" height="30" fill="#eab308" />}
          {isInProgress && <ProgressIcon className="mx-4" width="30" height="30" fill="#cbd5e1" />}
        </div>

        <div className="h-full w-full overflow-hidden">
          <div className="w-full p-2 text-center text-[2.2rem] font-bold line-clamp-3">{title}</div>
          {data?.split &&
            data.split('\n').map((datum, idx) => (
              <p
                key={datum + idx}
                className="!select-none resize-none bg-transparent p-2 text-[2rem] text-current tablet:text-[2.2rem]"
              >
                {datum}
              </p>
            ))}
        </div>

        <div
          className={`isAnimated flexcenter relative mt-12 max-h-0 w-full flex-wrap rounded-[3.5rem] bg-slate-800 p-3 opacity-0 group-hover:max-h-[12rem] group-hover:opacity-100 group-hover:delay-300 tablet:mt-6 tablet:group-hover:delay-[0ms] ${
            openTheme ? 'max-h-[12rem] opacity-100' : 'overflow-hidden'
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="custom-tippy">
            <Tippy
              interactive
              visible={openTheme}
              placement="bottom-end"
              onClickOutside={() => setOpenTheme(false)}
              render={(attrs) => (
                <ThemePanel
                  {...attrs}
                  themeSelected={theme}
                  setNewTheme={setNewTheme}
                  className={openTheme ? 'z-10' : 'z-[-1] !hidden'}
                />
              )}
            >
              <div onClick={() => setOpenTheme((s) => !s)}>
                <Tooltip
                  content="Change theme"
                  options={{
                    delay: 400,
                  }}
                >
                  <PaletteIcon
                    {...toolProps}
                    className={`${toolClass} ${
                      openTheme && '!translate-x-0 !opacity-100'
                    } translate-x-[-3rem] delay-[35ms]`}
                  />
                </Tooltip>
              </div>
            </Tippy>
          </div>

          <Tooltip
            content="Share"
            options={{
              delay: 400,
            }}
          >
            <div
              className="flexcenter relative"
              onClick={() => {
                copyToClipboard(
                  JSON.stringify({
                    title: note.title,
                    data: note.data,
                    theme: note.theme,
                    isPinned: note.isPinned,
                    isArchived: note.isArchived,
                    isDone: note.isDone,
                    isInProgress: note.isInProgress,
                  })
                );
                shareNotify();
              }}
            >
              <div className="absolute left-[1.3rem] h-[2.6rem] w-[2.6rem] animate-ping rounded-full bg-sky-300" />
              <NodeShareIcon
                {...toolProps}
                className={`translate-x-[-2rem] delay-[20ms] ${toolClass} ${
                  openTheme && '!translate-x-0 !opacity-100'
                }`}
              />
            </div>
          </Tooltip>

          <Tooltip
            content="Pin note"
            options={{
              delay: 400,
            }}
          >
            <PinIcon
              {...toolProps}
              className={`translate-x-[-0.6rem] delay-[0ms] ${toolClass} ${
                openTheme && '!translate-x-0 !opacity-100'
              }`}
              fill={!isPinned ? 'white' : '#f87171'}
              onClick={() =>
                setNoteOpts((s) => ({
                  ...s,
                  isPinned: !s.isPinned,
                  isArchived: !s.isPinned ? false : s.isArchived,
                }))
              }
            />
          </Tooltip>

          <Tooltip
            content="Is done"
            options={{
              delay: 400,
            }}
          >
            <DoneIcon
              {...toolProps}
              className={`translate-x-[0.6rem] delay-[12ms] ${toolClass} ${
                openTheme && '!translate-x-0 !opacity-100'
              }`}
              fill={!isDone ? 'white' : '#eab308'}
              onClick={() =>
                setNoteOpts((s) => ({
                  ...s,
                  isDone: !s.isDone,
                  isInProgress: !s.isDone ? false : s.isInProgress,
                }))
              }
            />
          </Tooltip>

          <Tooltip
            content="Is in progress"
            options={{
              delay: 400,
            }}
          >
            <ProgressIcon
              {...toolProps}
              className={`translate-x-[2rem] delay-[12ms] ${toolClass} ${
                openTheme && '!translate-x-0 !opacity-100'
              }`}
              fill={!isInProgress ? 'white' : '#cbd5e1'}
              onClick={() =>
                setNoteOpts((s) => ({
                  ...s,
                  isInProgress: !s.isInProgress,
                  isDone: !s.isInProgress ? false : s.isDone,
                }))
              }
            />
          </Tooltip>

          <Tooltip
            content="Archive"
            options={{
              delay: 400,
            }}
          >
            <ArchiveIcon
              {...toolProps}
              className={`translate-x-[3rem] delay-[12ms] ${toolClass} ${
                openTheme && '!translate-x-0 !opacity-100'
              }`}
              fill={!isArchived ? 'white' : '#94a3b8'}
              onClick={() =>
                setNoteOpts((s) => ({
                  ...s,
                  isArchived: !s.isArchived,
                  isPinned: !s.isArchived ? false : s.isPinned,
                }))
              }
            />
          </Tooltip>
        </div>
      </div>

      {openDetail && <NoteDetail noteStyle={noteStyle} note={note} setOpenDetail={setOpenDetail} />}
    </>
  );
};
