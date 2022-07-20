import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps {
  content?: string;
  before?: boolean;
  lineClamp?: string;
}

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  before = true,
  content = 'Button',
  lineClamp = 'none',
  ...props
}) => (
  <button
    {...props}
    className={`${
      className || ''
    } flexcenter flex-wrap mx-auto my-[1.5rem] px-[2.5rem] py-[0.6rem] font-semibold text-[4rem] text-center text-ctbg bg-ctcolor border-ctbg border-[0.4rem] rounded-[3rem] hover:bg-ctbg hover:text-white active:bg-ctbg active:text-white transition-all disabled:brightness-50`}
  >
    {before && children}

    <span className={`line-clamp-${lineClamp}`}>{content}</span>

    {!before && children}
  </button>
);
