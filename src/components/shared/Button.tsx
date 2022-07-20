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
      } flexcenter flex-wrap mx-auto my-[1.5rem] px-[2.5rem] py-[0.6rem] font-semibold text-[4rem] text-center text-ctbg bg-ctcolor border-ctbg border-[0.4rem] rounded-[3rem] hover:bg-ctbg hover:text-white active:bg-ctbg active:text-white transition-all disabled:brightness-50`}
    >
      {before && children}

      <span className={`line-clamp-${lineClamp}`}>{t(content.toLowerCase())}</span>

      {!before && children}
    </button>
  );
};
