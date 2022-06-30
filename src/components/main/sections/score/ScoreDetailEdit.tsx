import { IgnoreIcon, TrashIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader, TimeContainer } from 'components/shared';
import { FC, HTMLProps, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { deleteScore, editScore } from 'services';
import { ScoreDetailType, SubjectDetailType } from 'shared';
import { useStore } from 'store';

interface Inputs {
	score: string;
	base: string;
	type: string;
}

interface ScoreDetailProps {
	subject: SubjectDetailType | undefined;
	score: ScoreDetailType;
}

export const ScoreDetailEdit: FC<ScoreDetailProps & HTMLProps<HTMLDivElement>> = ({ subject, score, onClick }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [scoreOptions, setScoreOptions] = useState({
		isIgnored: score.isIgnored,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const removeScoreRecord = useCallback(() => {
		if (!currentUser || !currentUser?.uid || !subject?.id || !score?.id) return;

		const resp = deleteScore(currentUser.uid, subject.id, score.id);
	}, [subject, score]);

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			if (!currentUser || !currentUser?.uid || !subject?.id || !score?.id) return;

			const { base, score: value, type } = data;

			const resp = editScore(currentUser.uid, subject.id, score.id, {
				isIgnored: scoreOptions.isIgnored,
				base: +base,
				type,
				value: +value,
			});
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

			<TimeContainer obj={{ createdAt: score?.createdAt, updatedAt: score?.updatedAt }} />

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
						...register('type', { required: true, pattern: /^\S[\w\d\s]+\S$/ }),
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
