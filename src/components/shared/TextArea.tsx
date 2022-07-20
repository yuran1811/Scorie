import { DivProps } from '@/shared';
import { FC } from 'react';

interface TextAreaProps {
  formHandle?: any;
}

export const TextArea: FC<TextAreaProps & DivProps> = ({
  formHandle,
  className,
  ...otherProps
}) => (
  <textarea
    {...otherProps}
    {...formHandle}
    className={`${
      className || ''
    } text-[3.5rem] text-white bg-ctbg w-full max-w-[32rem] my-[0.5rem] px-[2rem] py-[1rem] outline-none border-[0.5rem] border-solid border-transparent rounded-[2.5rem] isAnimated focus:border-current`}
    placeholder="Content"
  />
);
