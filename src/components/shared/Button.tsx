import { ButtonHTMLAttributes, FC } from 'react';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <button
      {...props}
      className={`${
        className || ''
      } flexcenter mx-auto my-[1.5rem] flex-wrap rounded-[3rem] border-4 border-ctbg bg-ctcolor px-[2.5rem] py-[0.6rem] text-center text-[4rem] font-semibold text-ctbg transition-all hover:bg-ctbg hover:text-white active:bg-ctbg active:text-white disabled:brightness-50`}
    >
      {before && children}

      <span className={`line-clamp-${lineClamp}`}>{t(content.toLowerCase())}</span>

      {!before && children}
    </button>
  );
};
