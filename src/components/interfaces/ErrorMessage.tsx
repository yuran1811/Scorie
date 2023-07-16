import { DivProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  content?: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({ className = '', children, content = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`typo-2sm my-4 text-center font-semibold text-rose-400 ${className}`}>
      {children || t(content?.toLowerCase() || '')}
    </div>
  );
};
