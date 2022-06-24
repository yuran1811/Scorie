import { CloseIcon, TagIcon } from 'components/icons';
import { Dispatch, SetStateAction } from 'react';
import {
	ClearIndicatorProps,
	components,
	ControlProps,
	DropdownIndicatorProps,
	IndicatorsContainerProps,
	IndicatorSeparatorProps,
	InputProps,
	MenuListProps,
	MenuProps,
	OptionProps,
	PlaceholderProps,
	SingleValueProps,
	ValueContainerProps
} from 'react-select';
import { Option, SelectState } from './NewScoreRecord';

export interface CustomClearIndicatorProps extends ClearIndicatorProps<Option, false> {
	setSelectState: Dispatch<SetStateAction<SelectState>>;
}

export const SelectControl = (props: ControlProps<Option, false>) => (
	<components.Control
		{...props}
		className='!flex !items-center !justify-start !text-[3rem] !bg-ctbg !max-w-[25rem] !min-w-[25rem] !my-[0.5rem] !outline-none !border-none !rounded-[2.5rem] !shadow-none'
	/>
);

export const SelectValueContainer = (props: ValueContainerProps<Option, false>) => (
	<components.ValueContainer {...props} className='!flex !items-center !justify-start w-full !p-0 !px-8 text-white' />
);

export const SelectSingleValue = ({ children, ...otherProps }: SingleValueProps<Option, false>) => (
	<components.SingleValue {...otherProps} className='absolute left-0 !w-full !p-0 !px-8 !text-white !text-center'>
		{children}
	</components.SingleValue>
);

export const SelectInput = (props: InputProps<Option, false>) => (
	<components.Input
		{...props}
		placeholder='Type'
		className='!block !p-0 !px-8 !w-full'
		inputClassName='!z-[-1] absolute left-0 right-0 !text-center !text-[3rem] !text-white !bg-ctbg !focus:bg-indigo-700'
	/>
);

export const SelectMenu = ({ children, ...otherProps }: MenuProps<Option, false>) => (
	<components.Menu {...otherProps} className='!relative !top-[50%] !max-w-[25rem] !overflow-y-auto px-6 py-4 !rounded-[2.5rem]'>
		{children}
	</components.Menu>
);

export const SelectMenuList = ({ children, ...otherProps }: MenuListProps<Option, false>) => (
	<components.MenuList
		{...otherProps}
		className='!relative !top-[50%] !max-w-[25rem] !overflow-y-auto !flex !items-center !justify-center !flex-wrap'
	>
		{children}
	</components.MenuList>
);

export const SelectOption = (props: OptionProps<Option, false>) => (
	<components.Option {...props} className='!w-[10rem] !h-[5rem] !rounded-[2rem] text-center !text-[2.5rem] line-clamp-1' />
);

export const SelectPlaceholder = (props: PlaceholderProps<Option, false>) => <components.Placeholder {...props} />;

export const SelectIndicatorsContainer = (props: IndicatorsContainerProps<Option, false>) => (
	<components.IndicatorsContainer {...props} className='flexcenter p-4 w-[7rem] h-[7rem]' />
);

export const SelectClearIndicator = (props: CustomClearIndicatorProps) => {
	const {
		innerProps: { ref, ...restInnerProps },
		setSelectState,
	} = props;

	return (
		<div
			{...restInnerProps}
			ref={ref}
			style={{ display: 'none', padding: '0 0.8rem' }}
			onClick={() => setSelectState((s) => ({ ...s, value: { label: '', value: '' } }))}
		>
			<CloseIcon className='cursor-pointer mx-4 text-rose-400' width='35' height='35' />
		</div>
	);
};

export const SelectIndicatorSeparator = ({ innerProps }: IndicatorSeparatorProps<Option, false>) => {
	return <span {...innerProps} style={{ display: 'none' }} className='w-[1rem] h-[1rem] rounded-[50%] bg-white' />;
};

export const SelectDropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
	<components.DropdownIndicator {...props}>
		<TagIcon className='cursor-pointer mx-4 text-white' width='35' height='35' />
	</components.DropdownIndicator>
);
