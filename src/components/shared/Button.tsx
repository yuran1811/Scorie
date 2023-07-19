import { useStore } from '@/store';
import { classnames } from '@/utils';
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
  const settings = useStore((s) => s.settings);

  const { t } = useTranslation();

  return (
    <button
      {...props}
      className={classnames(
        'typo-sm flexcenter mx-auto my-[1rem] flex-wrap rounded-[3rem] border-4 border-violet-900 px-8 py-2 text-center font-semibold text-violet-900 transition-all hover:border-violet-400 hover:text-violet-400 active:text-violet-100 disabled:brightness-50',
        settings.glassmorphismDesign
          ? 'bg-violet-400 hover:bg-violet-900/90 active:bg-violet-700/90'
          : 'bg-violet-400 hover:bg-violet-900 active:bg-violet-700',
        className
      )}
    >
      {before && children}
      <span className={`line-clamp-${lineClamp}`}>{t(content.toLowerCase())}</span>
      {!before && children}
    </button>
  );
};
