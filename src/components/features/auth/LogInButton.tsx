import { ButtonProps } from '@/shared';
import { FC } from 'react';

export const LogInButton: FC<ButtonProps> = ({ className, children, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${
      className || 'bg-white text-black'
    } flexcenter typo-sm my-2 h-24 w-24 min-w-[6rem] max-w-[31rem] cursor-pointer gap-2 rounded-full px-6 py-3 transition duration-300 hover:scale-105 disabled:!cursor-default disabled:!brightness-75 medmb:h-auto medmb:w-max medmb:p-6`}
  >
    {children}
  </button>
);
