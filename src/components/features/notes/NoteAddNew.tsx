import { useStore } from 'store';
import { DivProps, NoteDetailType } from 'shared';
import { addNewNote, validateNoteOption } from 'services';
import { ErrorMessage } from 'components/interfaces';
import { DoneIcon, PinIcon, ProgressIcon } from 'components/icons';
import { Button, Input, ModalBox, ModalBoxHeader, TextArea } from 'components/shared';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
	title: string;
	data: string;
}

interface NoteAddNewProps {
	onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const NoteAddNew: FC<NoteAddNewProps & DivProps> = ({ onClickHandle }) => {
	const currentUser = useStore((s) => s.currentUser);

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

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
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

				addNewNote(currentUser.uid, noteToAdd);
			}
		},
		[noteOptions]
	);

	return (
		<ModalBox onClick={() => onClickHandle(false)}>
			<ModalBoxHeader onClick={() => onClickHandle(false)}>
				<PinIcon
					className='cursor-pointer mx-5'
					fill={!noteOptions.isPinned ? 'white' : '#f87171'}
					width='40'
					height='40'
					onClick={() => setNoteOptions((s) => ({ ...s, isPinned: !s.isPinned }))}
				/>
				<DoneIcon
					className='cursor-pointer mx-5'
					fill={!noteOptions.isDone ? 'white' : '#d97706'}
					width='40'
					height='40'
					onClick={() =>
						setNoteOptions((s) => ({
							...s,
							isDone: !s.isDone,
							isInProgress: !s.isDone ? false : s.isInProgress,
						}))
					}
				/>
				<ProgressIcon
					className='cursor-pointer mx-5'
					fill={!noteOptions.isInProgress ? 'white' : '#57534e'}
					width='40'
					height='40'
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
				<ErrorMessage className='mx-auto py-5 w-[80%] text-[3rem] text-center' content={status.message} />
			)}

			<div className='w-full text-[4rem] text-indigo-900 line-clamp-1'>New note</div>
			<form
				className='flexcentercol p-8 font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					placeholder='Title'
					defaultValue=''
					formHandle={{
						...register('title', {
							validate: {
								isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid title',
							},
						}),
					}}
				/>
				{errors?.title && <ErrorMessage className='text-[3rem]' content={errors.title.message || ''} />}

				<TextArea defaultValue='' className='font-normal' formHandle={{ ...register('data') }} />

				<Button className='!text-[3.6rem]' type='submit' content='Add' />
			</form>
		</ModalBox>
	);
};
