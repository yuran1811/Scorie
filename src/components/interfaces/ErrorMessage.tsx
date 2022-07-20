import { DivProps } from '@/shared';
import { FC } from 'react';

interface ErrorMessageProps {
  content?: string;
}

export const ErrorMessage: FC<ErrorMessageProps & DivProps> = ({
  className,
  children,
  content,
}) => (
  <div className={`text-rose-600 text-center font-semibold ${className || ''}`}>
    {children || content || ''}
  </div>
);
