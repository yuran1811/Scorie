import { CloseIcon, IgnoreIcon, ImportantIcon, StarIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input } from 'components/shared';
import { FC, HTMLProps, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { fakeUser } from 'services';
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
	SelectValueContainer,
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
	type: Option;
}

interface StateReducerType {
	[key: string]: boolean;
}

const createOption = (label: string) => ({ label, value: label.toLowerCase().replace(/\W/g, '') });

export const NewScoreRecord: FC<HTMLProps<HTMLDivElement>> = ({ onClick: clickHandle }) => {
	const { scores } = fakeUser[0];

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

	// const [openSelect, setOpenSelect] = useState(false);

	const {
		reset,
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = useCallback(
		(data) => {
			console.log('Ok');
			// reset({ subject: '', score: '', type: { label: '', value: '' } }, { keepErrors: false });
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
		<div className='z-[11] flexcenter fixed top-0 left-0 w-[100vw] h-[100vh]'>
			<div className='z-[1] cursor-pointer absolute top-0 left-0 w-full h-full bg-slate-700 opacity-80' onClick={clickHandle}></div>

			<div className='z-[2] absolute top-[12rem] max-w-[80%] max-h-[56rem] h-[calc(100vh-15rem)] text-[5rem] text-white'>
				<div className='h-full font-bold text-center text-rose-700 bg-violet-200 overflow-x-hidden overflow-y-auto rounded-[3rem]'>
					<div className='z-10 sticky top-0 left-0 right-0 flex items-center justify-between p-8 bg-violet-200'>
						<div className='flexcenter flex-wrap'>
							<IgnoreIcon
								className='cursor-pointer mx-5'
								fill={!scoreOptions.isIgnored ? 'white' : '#0891b2'}
								width='40'
								height='40'
								onClick={() => setScoreOptions((s) => ({ ...s, isIgnored: !s.isIgnored }))}
							/>
						</div>

						<CloseIcon
							className='cursor-pointer absolute right-3 tablet:right-6 top-[50%] translate-y-[-50%] mx-4'
							width='50'
							height='50'
							onClick={clickHandle}
						/>
					</div>

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
								content={errors?.subject.type === 'required' ? 'Please fill this field' : "Invalid subject's name"}
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
											ClearIndicator: (props) => <SelectClearIndicator {...props} setSelectState={setSelectState} />,
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

						{/* <Input
							placeholder='Type'
							defaultValue=''
							formHandle={{
								...register('type', { required: true, pattern: /[\w\d]/ }),
							}}
							onFocus={() => setOpenSelect(true)}
						/>
						{errors?.type && (
							<ErrorMessage
								extraStyle='text-[3rem]'
								content={errors?.type.type === 'required' ? 'Please fill this field' : 'Invalid type'}
							/>
						)}

						{openSelect && (
							<div className='text-[4rem] flexcenter flex-wrap p-8 mx-auto w-[80%]'>
								{Object.keys(typeList).map((type) => (
									<div key={type} className='p-4 m-4 text-rose-600 border-[0.5rem] border-rose-600 rounded-[2rem]'>
										{type}
									</div>
								))}
							</div>
						)} */}

						<Button type='submit' content='Add' />
					</form>
				</div>
			</div>
		</div>
	);
};
