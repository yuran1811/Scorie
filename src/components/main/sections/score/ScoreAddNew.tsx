import { CloseIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input } from 'components/shared';
import { Dispatch, FC, HTMLProps, SetStateAction, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface Inputs {
	subject: string;
}

export interface ScoreAddNewProps {
	onClickHandle: Dispatch<SetStateAction<boolean>>;
}

export const ScoreAddNew: FC<ScoreAddNewProps & HTMLProps<HTMLDivElement>> = ({ onClickHandle }) => {
	const [scoreOptions, setScoreOptions] = useState({
		isIgnored: false,
		isSpecial: false,
		isVital: false,
	});

	const [status, setStatus] = useState({ type: 'ok', message: '' });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			if (scoreOptions.isIgnored && (scoreOptions.isSpecial || scoreOptions.isVital))
				setStatus({
					type: 'errors',
					message: 'Subject cannot be both ignored and vital | special',
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
		<div className='z-[11] flexcenter fixed top-0 left-0 w-[100vw] h-[100vh]'>
			<div
				className='z-[1] cursor-pointer absolute top-0 left-0 w-full h-full bg-slate-700 opacity-80'
				onClick={() => onClickHandle(false)}
			></div>

			<div className='z-[2] absolute top-[12rem] max-w-[80%] max-h-[40rem] h-[calc(100vh-15rem)] text-[5rem] text-white'>
				<div className='h-full font-bold text-center text-rose-700 bg-violet-200 overflow-x-hidden overflow-y-auto rounded-[3rem]'>
					<div className='sticky top-0 left-0 right-0 flex items-center justify-between p-8 bg-violet-200'>
						<div className='flexcenter flex-wrap'>
							<StarIcon
								className='cursor-pointer mx-5'
								fill={!scoreOptions.isSpecial ? 'white' : '#d97706'}
								width='40'
								height='40'
								onClick={() => setScoreOptions((s) => ({ ...s, isSpecial: !s.isSpecial }))}
							/>
							<ImportantIcon
								className='cursor-pointer mx-5'
								fill={!scoreOptions.isVital ? 'white' : '#57534e'}
								width='40'
								height='40'
								onClick={() => setScoreOptions((s) => ({ ...s, isVital: !s.isVital }))}
							/>
							<IgnoreIcon
								className='cursor-pointer mx-5'
								fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
								width='40'
								height='40'
								onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
							/>
						</div>

						<CloseIcon className='cursor-pointer mx-4' width='50' height='50' onClick={() => onClickHandle(false)} />
					</div>

					<div className='w-full text-[4rem] text-indigo-900 line-clamp-1'>New subject</div>
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
								content={errors?.subject.type === 'required' ? 'Please fill this field' : "Invalid subject's name"}
							/>
						)}
						{status.type === 'errors' && <ErrorMessage extraStyle='text-[3rem]' content={status.message} />}

						<Button type='submit' content='Add' />
					</form>
				</div>
			</div>
		</div>
	);
};
