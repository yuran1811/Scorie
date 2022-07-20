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
    <div className={`text-rose-600 text-center font-semibold ${className || ''}`}>
      {children || t(content?.toLowerCase() || '')}
    </div>
  );
};
