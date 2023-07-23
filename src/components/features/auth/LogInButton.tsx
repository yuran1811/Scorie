import { ButtonProps } from '@/shared';
import { classnames } from '@/utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  provider: string;
  Icon?: any;
  size?: number;
}

export const LogInButton: FC<Props & ButtonProps> = ({ provider, size = 24, Icon, className, disabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        'flexcenter typo-2sm my-2 h-20 w-20 cursor-pointer gap-2 rounded-full px-6 py-3 transition duration-300 hover:scale-105 disabled:!cursor-default disabled:!brightness-75 medmb:h-auto medmb:w-max',
        className || 'bg-white text-black'
      )}
    >
      {!!Icon && <Icon height={size} width={size} />}
      <span className="hidden px-4 font-semibold medmb:block">
        {provider === 'guest' ? `${t('sign in')} ${t('as guest')}` : `${t('sign in with')} ${provider}`}
      </span>
    </button>
  );
};
