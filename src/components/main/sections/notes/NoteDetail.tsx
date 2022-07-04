import { useStore } from 'store';
import { NoteDetailType } from 'shared';
import { deleteNote, editNote, validateNoteOption } from 'services';
import { ErrorMessage } from 'components/interfaces';
import { Input, TextArea, TimeContainer } from 'components/shared';
import { ArchiveIcon, CloseIcon, DoneIcon, ProgressIcon, TrashIcon } from 'components/icons';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';

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
	const { id, isPinned, isArchived, isDone, isInProgress, title, data, createdAt, updatedAt } = note;

	const currentUser = useStore((s) => s.currentUser);

	const [status, setStatus] = useState({ type: 'ok', message: '' });
	const [noteOptions, setNoteOptions] = useState({ isDone, isInProgress, isArchived });

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

			if (note.title === data.title.trim() && note.data === data.data.trim()) {
				const optKeys = Object.entries(noteOptions);
				const noteKeys = Object.entries(note);

				let isSame = true;

				optKeys.forEach(([key, val], idx) => {
					noteKeys.forEach(([key2, val2], idx2) => {
						if (key === key2) {
							if (val === val2) {
								noteKeys.splice(idx2, 1);
							} else {
								isSame = false;
							}
						}
					});
				});

				if (isSame) {
					setOpenDetail(false);
					return;
				}
			}

			const noteToEdit = {
				title: data.title.trim(),
				data: data.data.trim(),
				...noteOptions,
			} as NoteDetailType;

			editNote(currentUser.uid, id, noteToEdit)
				.then(() => {
					setStatus({ type: 'ok', message: 'Update successfully' });
					setOpenDetail(false);
				})
				.catch(() => {
					setStatus({ type: 'errors', message: 'Fail to update' });
				});
		},
		[note, noteOptions]
	);
	const removeNote = useCallback(() => {
		if (!currentUser || !currentUser?.uid || !id) return;
		deleteNote(currentUser.uid, id);
	}, [note]);

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data: any) => {
			updateNote({ ...data });
		},
		[note, noteOptions]
	);

	return createPortal(
		<form className='z-20 fullscreen text-center scrollY' style={noteStyle} onSubmit={handleSubmit(onSubmit)}>
			<div
				className='sticky top-0 left-0 right-0 flex items-center justify-between p-8'
				style={{ backgroundColor: noteStyle.backgroundColor }}
			>
				<div className='flexcenter flex-wrap w-full mobile:pl-24'>
					<ArchiveIcon
						className='scale-75 tablet:scale-100 cursor-pointer mx-5 tablet:m-5'
						fill={!noteOptions.isArchived ? 'white' : '#94a3b8'}
						width='50'
						height='50'
						onClick={() => setNoteOptions((s) => ({ ...s, isArchived: !s.isArchived }))}
					/>
					<DoneIcon
						className='scale-75 tablet:scale-100 cursor-pointer mx-5 tablet:m-5'
						fill={!noteOptions.isDone ? 'white' : '#d97706'}
						width='50'
						height='50'
						onClick={() => setNoteOptions((s) => ({ ...s, isDone: !s.isDone }))}
					/>
					<ProgressIcon
						className='scale-75 tablet:scale-100 cursor-pointer mx-5 tablet:m-5'
						fill={!noteOptions.isInProgress ? 'white' : '#9ca3af'}
						width='50'
						height='50'
						onClick={() => setNoteOptions((s) => ({ ...s, isInProgress: !s.isInProgress }))}
					/>
					<TrashIcon
						className='scale-75 tablet:scale-100 cursor-pointer mx-5 tablet:m-5'
						width='45'
						height='45'
						onClick={() => removeNote()}
					/>
				</div>

				<button type='submit'>
					<CloseIcon className='cursor-pointer mx-4 text-rose-600' width='50' height='50' />
				</button>
			</div>

			{status.type === 'errors' && (
				<ErrorMessage extraStyle='px-6 text-[3rem] mobile:text-[4rem]' content={status.message} />
			)}

			<div className='flexcentercol px-8 pb-8 h-[calc(100%-14rem)] tablet:h-[calc(100%-12rem)]'>
				<TimeContainer className='font-semibold mobile:text-[4rem]' obj={{ updatedAt }} style={noteStyle} />

				<Input
					className='!font-bold !text-[3rem] mobile:!text-[6rem] text-center !max-w-full tablet:!max-w-[65rem]'
					style={noteStyle}
					defaultValue={title}
					formHandle={{
						...register('title', {
							required: true,
							pattern: /[\w\d]+/,
							validate: (value) => value.trim().length !== 0,
						}),
					}}
				/>
				{errors?.title && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.title.type === 'required' ? 'Please fill this field' : "Invalid title's name"}
					/>
				)}

				<TextArea
					className='!text-[3rem] mobile:!text-[3.6rem] !max-w-full tablet:!max-w-[65rem] text-left px-6 !h-full'
					style={noteStyle}
					defaultValue={data}
					formHandle={{ ...register('data') }}
				/>
			</div>
		</form>,
		document.getElementById('modal-container') as HTMLElement
	);
};
