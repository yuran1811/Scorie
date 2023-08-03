import { BackIcon } from '@cpns/icons';
import { ErrorText } from '@cpns/interfaces';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const NoteNotFound: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="p-[5rem]">
      <ErrorText className="text-[5rem] lgmb:line-clamp-1 medtab:text-[8rem]">{t('oops')}</ErrorText>
      <ErrorText className="line-clamp-3 text-[2.6rem] medtab:text-[4rem]">{t('no note found')}</ErrorText>
      <BackIcon className="!text-indigo-300" onClick={() => navigate('/notes')} />
    </div>
  );
};

export const NoNoteChosen: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="p-[5rem]">
      <ErrorText className="text-[5rem] lgmb:line-clamp-1 medtab:text-[8rem]">{t('oops')}</ErrorText>
      <ErrorText className="line-clamp-3 text-[2.6rem] medtab:text-[4rem]">{t('no note is chosen')}</ErrorText>
      <BackIcon className="!text-indigo-300" onClick={() => navigate('/notes')} />
    </div>
  );
};
