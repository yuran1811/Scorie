import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TextAreaProps {
  formHandle?: any;
}

export const TextArea: FC<TextAreaProps & DivProps> = ({ formHandle, className = '', ...otherProps }) => {
  const { t } = useTranslation();

  return (
    <textarea
      {...otherProps}
      {...formHandle}
      className={`typo my-[0.5rem] w-full max-w-[32rem] rounded-[2.5rem] border-[0.5rem] border-solid border-transparent bg-ctbg px-[2rem] py-[1rem] text-white outline-none transition-colors focus:border-current ${className}`}
      placeholder={t('content')}
    />
  );
};
