import { IgnoreIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input, ModalBox, ModalBoxHeader } from 'components/shared';
import { useAuthData } from 'contexts';
import { useLocalStore } from 'hooks';
import { FC, HTMLProps, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { ScoreDetail } from 'shared/types';
import {
	SelectClearIndicator,
	SelectControl,
	SelectDropdownIndicator,
	SelectIndicatorsContainer,
	SelectIndicatorSeparator,
	SelectInput,
	SelectMenu,
	SelectMenuList,
	SelectOption,
	SelectPlaceholder,
	SelectSingleValue,
	SelectValueContainer
} from './CustomReactSelect';

export interface Option {
	readonly label: string;
	readonly value: string;
}

export interface SelectState {
	readonly options: readonly Option[];
	readonly value: Option;
}

export interface Inputs {
	subject: string;
	score: string;
	base: string;
	type: Option;
}

interface StateReducerType {
	[key: string]: boolean;
}

const createOption = (label: string) => ({ label, value: label.toLowerCase().replace(/\W/g, '') });

export const NewScoreRecord: FC<HTMLProps<HTMLDivElement>> = ({ onClick }) => {
	const {
		data: { scores },
	} = useAuthData();

	const [scoresTmp, setScoresTmp] = useLocalStore<ScoreDetail[]>('scores_tmp', [], '[]');

	const typeList = useMemo(() => {
		return [
			...Array.from(
				new Set(
					Object.keys(
						scores.reduce<StateReducerType>((prevVal, thisVal) => {
							thisVal.scores.forEach(({ type }) => {
								prevVal[type] = true;
							});

							return prevVal;
						}, {})
					)
				)
			),
		].map((_) => createOption(_));
	}, [scores]);

	const [scoreOptions, setScoreOptions] = useState({ isIgnored: false });

	const [selectState, setSelectState] = useState<SelectState>({
		options: typeList,
		value: typeList[0],
	});

	const {
		reset,
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			console.log(data);

			const {
				base,
				subject,
				score: value,
				type: { value: type },
			} = data;

			const newScoreTmp = [...scoresTmp];
			newScoreTmp
				.filter((_) => _.subject === subject)
				.forEach((_) =>
					_.scores.push({
						id: scoresTmp.length + 1,
						isIgnored: scoreOptions.isIgnored,
						base: +base,
						value: +value,
						type,
					})
				);

			setScoresTmp(newScoreTmp);

			reset({ subject: '', score: '', base: '', type: { label: '', value: '' } }, { keepErrors: false });
		},
		[scoreOptions]
	);

	const handleCreate = useCallback((inputValue: string) => {
		const { options } = selectState;
		const newOption = createOption(inputValue);

		setSelectState({
			options: [newOption, ...options],
			value: newOption,
		});
	}, []);

	useEffect(() => {
		reset({ type: selectState.options[0] });
	}, [selectState.options]);

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
					placeholder='Subject'
					defaultValue=''
					formHandle={{
						...register('subject', { required: true, pattern: /[\w\d]+/ }),
					}}
				/>
				{errors?.subject && (
					<ErrorMessage
						extraStyle='text-[3rem]'
						content={
							errors?.subject.type === 'required' ? 'Please fill this field' : "Invalid subject's name"
						}
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

				<Controller
					name='type'
					control={control}
					rules={{ required: true }}
					render={({ field: { value, onChange, ...field } }) => (
						<>
							<CreatableSelect
								{...field}
								className='flexcentercol max-w-[40rem] w-full min-w-[22rem] text-[2rem] text-left'
								isClearable
								value={selectState.value}
								options={selectState.options}
								components={{
									Control: (props) => <SelectControl {...props} />,
									ValueContainer: (props) => <SelectValueContainer {...props} />,
									SingleValue: (props) => <SelectSingleValue {...props} />,
									Input: (props) => <SelectInput {...props} />,
									Menu: (props) => <SelectMenu {...props} />,
									MenuList: (props) => <SelectMenuList {...props} />,
									Option: (props) => <SelectOption {...props} />,
									Placeholder: (props) => <SelectPlaceholder {...props} />,
									IndicatorsContainer: (props) => <SelectIndicatorsContainer {...props} />,
									ClearIndicator: (props) => (
										<SelectClearIndicator {...props} setSelectState={setSelectState} />
									),
									IndicatorSeparator: (props) => <SelectIndicatorSeparator {...props} />,
									DropdownIndicator: (props) => <SelectDropdownIndicator {...props} />,
								}}
								onCreateOption={handleCreate}
								onChange={(e) => {
									onChange(e);
									e?.label && setSelectState((s) => ({ ...s, value: e }));
								}}
							/>
							{errors?.type && <ErrorMessage extraStyle='text-[3rem]' content='Please fill this field' />}
						</>
					)}
				/>

				<Button type='submit' content='Add' />
			</form>
		</ModalBox>
	);
};
