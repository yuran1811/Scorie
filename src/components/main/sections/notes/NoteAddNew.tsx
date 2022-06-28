import { DoneIcon, ProgressIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader, TextArea } from 'components/shared';
import { Dispatch, FC, HTMLProps, SetStateAction, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface Inputs {
	title: string;
}

export interface NoteAddNewProps {
	onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const NoteAddNew: FC<NoteAddNewProps & HTMLProps<HTMLDivElement>> = ({ onClickHandle }) => {
	const [status, setStatus] = useState({ type: 'ok', message: '' });
	const [scoreOptions, setScoreOptions] = useState({
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
			if (scoreOptions.isDone && scoreOptions.isInProgress)
				setStatus({
					type: 'errors',
					message: 'Note cannot be both done and in progree',
				});
			else {
				onClickHandle(false);
				setStatus({
					type: 'ok',
					message: 'Alright',
				});
			}
		},
		[scoreOptions]
	);

	return (
		<ModalBox onClick={() => onClickHandle(false)}>
			<ModalBoxHeader onClick={() => onClickHandle(false)}>
				<DoneIcon
					className='cursor-pointer mx-5'
					fill={!scoreOptions.isDone ? 'white' : '#d97706'}
					width='40'
					height='40'
					onClick={() => setScoreOptions((s) => ({ ...s, isDone: !s.isDone }))}
				/>
				<ProgressIcon
					className='cursor-pointer mx-5'
					fill={!scoreOptions.isInProgress ? 'white' : '#57534e'}
					width='40'
					height='40'
					onClick={() => setScoreOptions((s) => ({ ...s, isInProgress: !s.isInProgress }))}
				/>
			</ModalBoxHeader>

			<div className='w-full text-[4rem] text-indigo-900 line-clamp-1'>New note</div>
			<form
				className='flexcentercol p-8 font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					placeholder='Title'
					defaultValue=''
					formHandle={{
						...register('title', { required: true, pattern: /[\w\d]+/ }),
					}}
				/>
				{errors?.title && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.title.type === 'required' ? 'Please fill this field' : "Invalid title's name"}
					/>
				)}
				{status.type === 'errors' && <ErrorMessage extraStyle='text-[3rem]' content={status.message} />}

				<TextArea />

				<Button type='submit' content='Add' />
			</form>
		</ModalBox>
	);
};
