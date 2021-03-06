import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  content?: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({
  className,
  children,
  content,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`my-4 text-center text-[2.6rem] font-semibold text-rose-600 ${className || ''}`}
    >
      {children || t(content?.toLowerCase() || '')}
    </div>
  );
};
