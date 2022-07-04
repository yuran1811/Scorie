import { useStore } from 'store';
import { getNoteStyle } from 'utils';
import { editNote, noteIndexListRef } from 'services';
import { NoteItemProps } from 'shared';
import { NoteDetail } from './NoteDetail';
import { ThemePanel } from './ThemePanel';
import { ClickAway } from 'components/shared';
import { ArchiveIcon, DoneIcon, NodeShareIcon, PaletteIcon, PinIcon, ProgressIcon } from 'components/icons';
import { FC, useEffect, useState } from 'react';

const toolClass = 'isAnimated m-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100';
const toolProps = { width: '30', height: '30', fill: 'white' };

export const NoteItem: FC<NoteItemProps> = ({ isShow, note }) => {
	const { id, title, data, isPinned, isArchived, isDone, isInProgress, theme } = note;

	const noteStyle = getNoteStyle(theme);

	const currentUser = useStore((s) => s.currentUser);

	const [openTheme, setOpenTheme] = useState(false);
	const [openDetail, setOpenDetail] = useState<boolean>(false);
	const [newTheme, setNewTheme] = useState(theme || 'default');
	const [noteOpts, setNoteOpts] = useState({ isPinned, isArchived });

	useEffect(() => {
		if (!currentUser || !currentUser?.uid || !id) return;

		if (note.theme !== newTheme) editNote(currentUser.uid, id, { theme: newTheme });
	}, [newTheme]);

	useEffect(() => {
		if (!currentUser || !currentUser?.uid || !id) return;
		if (noteOpts.isPinned && noteOpts.isArchived) return;

		if (note.isArchived !== noteOpts.isArchived || note.isPinned !== noteOpts.isPinned) {
			editNote(currentUser.uid, id, { ...noteOpts });
		}
	}, [noteOpts]);

	return (
		<>
			<div
				className={`isAnimated cursor-pointer relative flexcentercol min-w-[20rem] w-full mobile:max-w-[28rem] max-h-[35rem] m-6 px-8 py-6 border-transparent hover:border-white border-[0.3rem] rounded-[2rem] group ${
					!isShow && '!hidden'
				}`}
				style={noteStyle}
				onClick={() => setOpenDetail(true)}
			>
				<div className='flexcenter'>
					{isPinned && <PinIcon className='mx-5' width='40' height='40' fill='#f87171' />}
					{isDone && <DoneIcon className='mx-4' width='40' height='40' fill='#eab308' />}
					{isInProgress && <ProgressIcon className='mx-4' width='40' height='40' fill='#cbd5e1' />}
				</div>

				<div className='w-full h-full overflow-y-hidden line-clamp-3'>
					<div className='font-bold text-center text-[4rem] w-full line-clamp-1 pt-4 px-4'>{title}</div>
					{data?.split &&
						data.split('\n').map((datum, idx) => (
							<p
								key={datum + idx}
								className='text-[2.6rem] text-current px-4 bg-transparent !select-none resize-none'
							>
								{datum}
							</p>
						))}
				</div>

				<div
					className={`isAnimated relative flexcenter w-full mt-6 px-5 py-3 bg-slate-800 rounded-[3.5rem] opacity-0 group-hover:opacity-100 ${
						openTheme ? 'opacity-100' : ''
					}`}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<div onClick={() => setOpenTheme((s) => !s)}>
						<ClickAway
							className={`${openTheme ? 'z-[9]' : 'hidden z-[-1]'}`}
							onClick={(e) => {
								e.stopPropagation();
								setOpenTheme(false);
							}}
						/>
						<ThemePanel
							themeSelected={theme}
							setNewTheme={setNewTheme}
							className={`${openTheme ? '!flex z-10' : '!hidden z-[-1]'} isAnimated origin-top`}
						/>
						<PaletteIcon
							{...toolProps}
							className={`${toolClass} ${
								openTheme && '!translate-x-0 !opacity-100'
							} translate-x-[-3rem] delay-[35ms]`}
						/>
					</div>
					<NodeShareIcon
						{...toolProps}
						className={`${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						} translate-x-[-2rem] delay-[20ms]`}
					/>
					<ArchiveIcon
						{...toolProps}
						className={`${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						} translate-x-[-1.2rem] delay-[12ms]`}
						onClick={() => setNoteOpts((s) => ({ ...s, isArchived: !s.isArchived }))}
					/>
					<PinIcon
						{...toolProps}
						className={`${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						} translate-x-[-0.6rem] delay-[0ms]`}
						onClick={() => setNoteOpts((s) => ({ ...s, isPinned: !s.isPinned }))}
					/>
				</div>
			</div>

			{openDetail && <NoteDetail noteStyle={noteStyle} note={note} setOpenDetail={setOpenDetail} />}
		</>
	);
};
