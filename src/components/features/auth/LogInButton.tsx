import { ButtonProps } from '@/shared';
import { FC } from 'react';

export const LogInButton: FC<ButtonProps> = ({ className, children, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${
      className || 'bg-white text-black'
    } flexcenter my-2 h-24 w-24 min-w-[6rem] max-w-[31rem] cursor-pointer gap-3 rounded-full px-6 py-3 text-[3rem] transition duration-300 hover:scale-105 disabled:!cursor-default disabled:!brightness-75 midmb:h-auto midmb:w-full`}
  >
    {children}
  </button>
);
