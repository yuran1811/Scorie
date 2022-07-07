import { useStore } from 'store';
import { DivProps, SubjectListType } from 'shared';
import { addNewSubject, validateSubjectOption } from 'services';
import { ErrorMessage } from 'components/interfaces';
import { IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { Button, Input, ModalBox, ModalBoxHeader } from 'components/shared';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
	subject: string;
}

interface ScoreAddNewProps {
	subjects: SubjectListType[];
	onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const SubjectAddNew: FC<ScoreAddNewProps & DivProps> = ({ subjects, onClickHandle }) => {
	const currentUser = useStore((s) => s.currentUser);

	const [status, setStatus] = useState({ type: 'ok', message: '' });
	const [subjectOptions, setSubjectOptions] = useState({
		isIgnored: false,
		isSpecial: false,
		isVital: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		({ subject }) => {
			if (validateSubjectOption(subjectOptions)) {
				setStatus({
					type: 'errors',
					message: 'Subject cannot be both ignored and vital | special',
				});

				return;
			}

			onClickHandle(false);
			setStatus({
				type: 'ok',
				message: 'Alright',
			});

			if (currentUser && currentUser?.uid) {
				const notUnique = subjects.find((_) => _.subject.name === subject);
				if (notUnique) return;

				addNewSubject(currentUser.uid, {
					...subjectOptions,
					name: subject.trim(),
					scores: [],
				});
			}
		},
		[subjectOptions]
	);

	return (
		<ModalBox onClick={() => onClickHandle(false)}>
			<ModalBoxHeader onClick={() => onClickHandle(false)}>
				<StarIcon
					className='cursor-pointer m-[0.6rem] mx-4 mobile:m-5'
					fill={!subjectOptions.isSpecial ? 'white' : '#d97706'}
					width='40'
					height='40'
					onClick={() => setSubjectOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
				/>
				<ImportantIcon
					className='cursor-pointer m-[0.6rem] mx-4 mobile:m-5'
					fill={!subjectOptions.isVital ? 'white' : '#57534e'}
					width='40'
					height='40'
					onClick={() => setSubjectOptions((s) => ({ ...s, isVital: !s.isVital }))}
				/>
				<IgnoreIcon
					className='cursor-pointer m-[0.6rem] mx-4 mobile:m-5'
					fill={!subjectOptions.isIgnored ? 'white' : '#0891b2'}
					width='40'
					height='40'
					onClick={() => setSubjectOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
				/>
			</ModalBoxHeader>

			<div className='w-full text-[4rem] text-indigo-900 line-clamp-1'>New subject</div>
			<form
				className='flexcentercol p-8 font-bold text-[5rem] text-center text-teal-700 w-full line-clamp-1'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					placeholder='Subject'
					defaultValue=''
					formHandle={{
						...register('subject', {
							required: 'Please fill in this field',
							validate: {
								notEmpty: (v) => v.trim().length !== 0 || 'Subject cannot be empty',
								isValid: (v) => /[\w\d\s]+/.test(v.trim()) || 'Invalid subject',
							},
						}),
					}}
				/>
				{errors?.subject && <ErrorMessage extraStyle='text-[3rem]' content={errors.subject.message || ''} />}

				{status.type === 'errors' && <ErrorMessage extraStyle='text-[3rem]' content={status.message} />}

				<Button className='!text-[3.6rem]' type='submit' content='Add' />
			</form>
		</ModalBox>
	);
};
