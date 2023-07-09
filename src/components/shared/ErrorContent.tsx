import { BackIcon } from '@cpns/icons';
import { ErrorText } from '@cpns/interfaces';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ErrorContentProps {
  errorBoundaries?: boolean;
}

export const ErrorContent: FC<ErrorContentProps> = ({ errorBoundaries = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="p-[5rem]">
      <ErrorText className="text-[7rem] lgmb:line-clamp-1 medtab:text-[15rem]">{t('oops')}</ErrorText>
      <ErrorText className="line-clamp-3 text-[4rem] medtab:text-[5rem]">{t('something went wrong')}</ErrorText>
      <BackIcon
        className="!text-indigo-300"
        onClick={() => {
          if (errorBoundaries) {
            navigate('/');
            window.location.reload();
          } else navigate(-1);
        }}
      />
    </div>
  );
};
