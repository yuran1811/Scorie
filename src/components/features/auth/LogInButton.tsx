import { ButtonProps } from '@/shared';
import { FC } from 'react';

export const LogInButton: FC<ButtonProps> = ({ className, children, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${
      className || 'bg-white text-black'
    } my-2 flex min-w-[25rem] cursor-pointer items-center gap-3 rounded-[2rem] px-6 py-3 text-[3rem] transition duration-300 hover:brightness-90 disabled:!cursor-default disabled:!brightness-75`}
  >
    {children}
  </button>
);
