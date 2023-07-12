import { ButtonHTMLAttributes, FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
  content?: string;
  before?: boolean;
  lineClamp?: string;
}

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  before = true,
  content = 'Button',
  lineClamp = 'none',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <button
      {...props}
      className={`typo-sm flexcenter mx-auto my-[1.5rem] flex-wrap rounded-[3rem] border-4 border-violet-900 bg-violet-400 px-8 py-2 text-center font-semibold text-violet-900 transition-all hover:border-violet-400 hover:bg-violet-900 hover:text-violet-400 active:bg-violet-700 active:text-violet-100 disabled:brightness-50 ${className}`}
    >
      {before && children}
      <span className={`line-clamp-${lineClamp}`}>{t(content.toLowerCase())}</span>
      {!before && children}
    </button>
  );
};
