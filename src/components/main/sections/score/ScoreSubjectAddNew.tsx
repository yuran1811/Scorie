import { useStore } from 'store';
import { getFirebaseErr } from 'utils';
import { SubjectDetailType } from 'shared';
import { addNewScore, addNewSubject, editSubject } from 'services';
import { IgnoreIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader } from 'components/shared';
import { FC, HTMLProps, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
	subject: string;
	score: string;
	base: string;
	type: string;
}

interface ScoreSubjectAddNewProps {
	subjects: SubjectDetailType[];
}

export const ScoreSubjectAddNew: FC<ScoreSubjectAddNewProps & HTMLProps<HTMLDivElement>> = ({ onClick, subjects }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [scoreOptions, setScoreOptions] = useState({ isIgnored: false });

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			if (!currentUser || !currentUser?.uid) return;

			const { base, score: value, type, subject } = data;

			const validSubject = subjects.find((_) => _.name === subject);
			if (!validSubject) {
				addNewSubject(currentUser.uid, {
					name: subject,
					isSpecial: false,
					isVital: false,
					isIgnored: false,
					scores: [],
				}).then(({ data }) => {
					if (!data) return;

					addNewScore(currentUser.uid, data.id, {
						id: '1',
						isIgnored: scoreOptions.isIgnored,
						type,
						base: +base,
						value: +value,
					});
				});
			} else {
				addNewScore(currentUser.uid, validSubject.id, {
					id: +validSubject.scores[validSubject.scores.length - 1].id + 1 + '',
					isIgnored: scoreOptions.isIgnored,
					type,
					base: +base,
					value: +value,
				});
			}

			reset({ score: '', base: '', type: '' }, { keepErrors: false });
		},
		[scoreOptions, subjects]
	);

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
					placeholder='Subject'
					defaultValue=''
					formHandle={{
						...register('subject', { required: true, pattern: /[\w\d]+/ }),
					}}
				/>
				{errors?.subject && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={errors?.subject.type === 'required' ? 'Please fill this field' : 'Invalid subject'}
					/>
				)}

				<Input
					placeholder='Score'
					defaultValue=''
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
					defaultValue=''
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
					defaultValue=''
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

				<Button type='submit' content='Add' />
			</form>
		</ModalBox>
	);
};
