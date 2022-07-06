import { useStore } from 'store';
import { addNewScore } from 'services';
import { DivProps, SubjectDetailType } from 'shared';
import { IgnoreIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader } from 'components/shared';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
	score: string;
	base: string;
	type: string;
}

interface ScoreAddNewProps {
	subject: SubjectDetailType | undefined;
}

export const ScoreAddNew: FC<ScoreAddNewProps & DivProps> = ({
	subject,

	onClick,
}) => {
	const currentUser = useStore((s) => s.currentUser);

	const [scoreOptions, setScoreOptions] = useState({ isIgnored: false });

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		if (!currentUser || !currentUser?.uid || !subject || !subject.id) return;

		const { base, score: value, type } = data;

		const scoreToAdd = {
			id: (subject.scores.length ? +subject.scores[subject.scores.length - 1].id + 1 : 1) + '',
			isIgnored: scoreOptions.isIgnored,
			type: type.trim(),
			base: +base.trim(),
			value: +value.trim(),
		};

		addNewScore(currentUser.uid, subject.id, scoreToAdd);

		reset({ score: '', base: '', type: '' }, { keepErrors: false });
	};

	return (
		<ModalBox onClick={onClick}>
			<ModalBoxHeader onClick={onClick}>
				<IgnoreIcon
					className='cursor-pointer mx-5'
					fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
					width='40'
					height='40'
					onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
				/>
			</ModalBoxHeader>

			<div className='w-full text-[4rem] text-indigo-900 line-clamp-1'>New record</div>
			<form
				className='flexcentercol p-8 font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					placeholder='Score'
					defaultValue=''
					formHandle={{
						...register('score', {
							required: true,
							pattern: /(\d+)(\.\d+)?/,
							validate: (value) => value.trim().length !== 0,
						}),
					}}
				/>
				{errors?.score && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.score.type === 'required' ? 'Please fill this field' : 'Invalid score'}
					/>
				)}

				<Input
					placeholder='Base'
					defaultValue=''
					formHandle={{
						...register('base', {
							required: true,
							pattern: /\d+/,
							validate: (value) => value.trim().length !== 0,
						}),
					}}
				/>
				{errors?.base && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.base.type === 'required' ? 'Please fill this field' : 'Invalid base'}
					/>
				)}

				<Input
					placeholder='Type'
					defaultValue=''
					formHandle={{
						...register('type', {
							required: true,
							pattern: /[\w\d\s]+/,
							validate: (value) => value.trim().length !== 0,
						}),
					}}
				/>
				{errors?.type && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.type.type === 'required' ? 'Please fill this field' : 'Invalid type'}
					/>
				)}

				<Button className='!text-[3.6rem]' type='submit' content='Add' />
			</form>
		</ModalBox>
	);
};
