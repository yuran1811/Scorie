import { CloseIcon, TagIcon } from '@cpns/icons';
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
  ValueContainerProps,
} from 'react-select';

export interface Option {
  readonly label: string;
  readonly value: string;
}

export interface SelectState {
  readonly options: readonly Option[];
  readonly value: Option;
}

export interface CustomClearIndicatorProps extends ClearIndicatorProps<Option, false> {
  setSelectState: Dispatch<SetStateAction<SelectState>>;
}

export const SelectControl = (props: ControlProps<Option, false>) => (
  <components.Control
    {...props}
    className="!my-[0.5rem] !flex !w-full !max-w-[25rem] !items-center !justify-start !rounded-[2.5rem] !border-none !bg-ctbg !text-[3rem] !shadow-none !outline-none"
  />
);

export const SelectValueContainer = (props: ValueContainerProps<Option, false>) => (
  <components.ValueContainer
    {...props}
    className="!flex w-full !items-center !justify-start !p-0 !px-8 text-white"
  />
);

export const SelectSingleValue = ({ children, ...otherProps }: SingleValueProps<Option, false>) => (
  <components.SingleValue
    {...otherProps}
    className="absolute left-0 !w-full !p-0 !px-8 !text-center !text-white"
  >
    {children}
  </components.SingleValue>
);

export const SelectInput = (props: InputProps<Option, false>) => (
  <components.Input
    {...props}
    placeholder="Type"
    className="!block !w-full !p-0 !px-8"
    inputClassName="!z-[-1] absolute left-0 right-0 !text-center !text-[3rem] !text-white !bg-ctbg !focus:bg-indigo-700"
  />
);

export const SelectMenu = ({ children, ...otherProps }: MenuProps<Option, false>) => (
  <components.Menu
    {...otherProps}
    className="!relative !top-1/2 !max-w-[25rem] !overflow-y-auto !rounded-[2.5rem] px-4 py-4"
  >
    {children}
  </components.Menu>
);

export const SelectMenuList = ({ children, ...otherProps }: MenuListProps<Option, false>) => (
  <components.MenuList
    {...otherProps}
    className="!flex !flex-wrap !items-center !justify-center !overflow-y-auto"
  >
    {children}
  </components.MenuList>
);

export const SelectOption = (props: OptionProps<Option, false>) => (
  <components.Option
    {...props}
    className="!m-4 !h-[4.2rem] !w-[8rem] !cursor-pointer !rounded-[2rem] text-center !text-[2rem] line-clamp-1"
  />
);

export const SelectPlaceholder = (props: PlaceholderProps<Option, false>) => (
  <components.Placeholder
    {...props}
    className="absolute left-0 !w-full !p-0 !px-8 !text-center !font-normal italic !text-white"
  />
);

export const SelectIndicatorsContainer = (props: IndicatorsContainerProps<Option, false>) => (
  <components.IndicatorsContainer {...props} className="flexcenter h-[7rem] w-[7rem] p-4" />
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
      <CloseIcon className="mx-4 cursor-pointer text-rose-400" width="35" height="35" />
    </div>
  );
};

export const SelectIndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<Option, false>) => {
  return (
    <span
      {...innerProps}
      style={{ display: 'none' }}
      className="h-[1rem] w-[1rem] rounded-full bg-white"
    />
  );
};

export const SelectDropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
  <components.DropdownIndicator {...props}>
    <TagIcon className="mx-4 cursor-pointer text-white" width="35" height="35" />
  </components.DropdownIndicator>
);
