import { useStore } from 'store';
import { editNote, validateNoteOption } from 'services';
import { getNoteStyle, shallowObjectCompare } from 'utils';
import { NoteItemProps } from 'shared';
import { NoteDetail } from './NoteDetail';
import { ThemePanel } from './ThemePanel';
import { ClickAway } from 'components/shared';
import { ArchiveIcon, DoneIcon, NodeShareIcon, PaletteIcon, PinIcon, ProgressIcon } from 'components/icons';
import { FC, useEffect, useState } from 'react';

const toolClass = 'isAnimated m-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100';
const toolProps = { width: '30', height: '30', fill: 'white' };

export const NoteItem: FC<NoteItemProps> = ({ viewMode, isShow, note }) => {
	const { id, title, data, isPinned, isArchived, isDone, isInProgress, theme } = note;
	const noteStyle = getNoteStyle(theme);

	const currentUser = useStore((s) => s.currentUser);

	const [openTheme, setOpenTheme] = useState(false);
	const [openDetail, setOpenDetail] = useState<boolean>(false);
	const [newTheme, setNewTheme] = useState(theme || 'default');
	const [noteOpts, setNoteOpts] = useState({ isDone, isInProgress, isArchived, isPinned });

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
				className={`isAnimated cursor-pointer relative flexcentercol ${
					viewMode === 'list' ? 'w-full' : 'w-[20rem]'
				} tablet:w-[24rem] max-h-[35rem] m-2 p-4 border-transparent hover:border-white border-[0.3rem] rounded-[2rem] group ${
					!isShow && '!hidden'
				}`}
				style={noteStyle}
				onClick={() => setOpenDetail(true)}
			>
				<div className='flexcenter'>
					{isPinned && <PinIcon className='mx-5' width='30' height='30' fill='#f87171' />}
					{isDone && <DoneIcon className='mx-4' width='30' height='30' fill='#eab308' />}
					{isInProgress && <ProgressIcon className='mx-4' width='30' height='30' fill='#cbd5e1' />}
				</div>

				<div className='w-full h-full overflow-y-hidden line-clamp-3'>
					<div className='font-bold text-center text-[2.4rem] tablet:text-[2.8rem] w-full line-clamp-1 p-2'>
						{title}
					</div>
					{data?.split &&
						data.split('\n').map((datum, idx) => (
							<p
								key={datum + idx}
								className='text-[2rem] tablet:text-[2.4rem] text-current p-2 bg-transparent !select-none resize-none'
							>
								{datum}
							</p>
						))}
				</div>

				<div
					className={`isAnimated group-hover:delay-300 tablet:group-hover:delay-[0ms] relative flexcenter flex-wrap w-full max-h-0 mt-12 tablet:mt-6 p-3 bg-slate-800 rounded-[3.5rem] opacity-0 group-hover:opacity-100 group-hover:max-h-[12rem] ${
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
					<div className='flexcenter relative'>
						<div className='absolute left-[1.3rem] animate-ping bg-sky-300 w-[2.6rem] h-[2.6rem] rounded-[50%]'></div>
						<NodeShareIcon
							{...toolProps}
							className={`translate-x-[-2rem] delay-[20ms] ${toolClass} ${
								openTheme && '!translate-x-0 !opacity-100'
							}`}
						/>
					</div>
					<PinIcon
						{...toolProps}
						className={`translate-x-[-0.6rem] delay-[0ms] ${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						}`}
						fill={!noteOpts.isPinned ? 'white' : '#f87171'}
						onClick={() => setNoteOpts((s) => ({ ...s, isPinned: !s.isPinned }))}
					/>
					<DoneIcon
						{...toolProps}
						className={`translate-x-[0.6rem] delay-[12ms] ${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						}`}
						fill={!noteOpts.isDone ? 'white' : '#eab308'}
						onClick={() =>
							setNoteOpts((s) => ({
								...s,
								isDone: !s.isDone,
								isInProgress: !s.isDone ? false : s.isInProgress,
							}))
						}
					/>
					<ProgressIcon
						{...toolProps}
						className={`translate-x-[2rem] delay-[12ms] ${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						}`}
						fill={!noteOpts.isInProgress ? 'white' : '#cbd5e1'}
						onClick={() =>
							setNoteOpts((s) => ({
								...s,
								isInProgress: !s.isInProgress,
								isDone: !s.isInProgress ? false : s.isDone,
								s,
							}))
						}
					/>
					<ArchiveIcon
						{...toolProps}
						className={`translate-x-[3rem] delay-[12ms] ${toolClass} ${
							openTheme && '!translate-x-0 !opacity-100'
						}`}
						fill={!noteOpts.isArchived ? 'white' : '#94a3b8'}
						onClick={() => setNoteOpts((s) => ({ ...s, isArchived: !s.isArchived }))}
					/>
				</div>
			</div>

			{openDetail && <NoteDetail noteStyle={noteStyle} note={note} setOpenDetail={setOpenDetail} />}
		</>
	);
};
