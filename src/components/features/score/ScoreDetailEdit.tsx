import { useStore } from 'store';
import { editSubject } from 'services';
import { DivProps, ScoreDetailType, SubjectDetailType } from 'shared';
import { ErrorMessage } from 'components/interfaces';
import { IgnoreIcon, TrashIcon } from 'components/icons';
import { Button, Input, ModalBox, ModalBoxHeader, TimeContainer } from 'components/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useCallback, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

interface Inputs {
	score: string;
	base: string;
	type: string;
}

interface ScoreDetailProps {
	score: ScoreDetailType;
	subject: SubjectDetailType | undefined;
	scores: ScoreDetailType[];
}

export const ScoreDetailEdit: FC<ScoreDetailProps & DivProps> = ({ subject, score, scores, onClick }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [scoreOptions, setScoreOptions] = useState({
		isIgnored: score && score?.isIgnored ? score.isIgnored : false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const removeScoreRecord = useCallback(() => {
		if (!currentUser || !currentUser?.uid || !subject?.id || !subject?.scores) return;

		const scoreIdx = scores.findIndex((_) => _.id === score.id);
		const newscores = [...scores];

		newscores.splice(scoreIdx, 1);

		editSubject(currentUser.uid, subject.id, { scores: [...newscores] });
	}, []);

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			if (!currentUser || !currentUser?.uid || !subject?.id || !scores.length || !score || !score?.id) return;

			const { base, score: value, type } = data;

			const prevScore = scores.find((_) => _.id === score.id);
			const scoreIdx = scores.findIndex((_) => _.id === score.id);
			const newscores = [...scores];

			const scoreToEdit = {
				...prevScore,
				id: score.id,
				isIgnored: scoreOptions.isIgnored,
				type: type.trim(),
				base: +base.trim(),
				value: +value.trim(),
				updatedAt: Timestamp.fromDate(new Date()),
			};

			newscores.splice(scoreIdx, 1, scoreToEdit);

			editSubject(currentUser.uid, subject.id, { scores: [...newscores] });
		},
		[scoreOptions]
	);

	return (
		<ModalBox onClick={onClick}>
			<ModalBoxHeader onClick={onClick}>
				<IgnoreIcon
					className='cursor-pointer m-[0.6rem] mx-4 mobile:m-5'
					fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
					width='40'
					height='40'
					onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
				/>
				<TrashIcon
					className='cursor-pointer m-[0.6rem] mx-4 mobile:m-5 text-slate-500'
					width='40'
					height='40'
					onClick={() => removeScoreRecord()}
				/>
			</ModalBoxHeader>

			<TimeContainer
				obj={{
					createdAt: score?.createdAt,
					updatedAt: score?.updatedAt,
				}}
			/>

			<form
				className='flexcentercol p-8 font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					placeholder='Score'
					defaultValue={score?.value || ''}
					formHandle={{
						...register('score', { required: true, pattern: /(\d+)(\.\d+)?/ }),
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
					defaultValue={score?.base || ''}
					formHandle={{
						...register('base', { required: true, pattern: /\d+/ }),
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
					defaultValue={score?.type || ''}
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

				<Button type='submit' content='Update' />
			</form>
		</ModalBox>
	);
};
