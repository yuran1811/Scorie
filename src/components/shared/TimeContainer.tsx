import { DivProps } from '@/shared';
import { formatDate } from '@/utils';
import { Timestamp } from 'firebase/firestore';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeContainerProps {
  obj: {
    createdAt?: Timestamp | undefined | null;
    updatedAt?: Timestamp | undefined | null;
  };
}

export const TimeContainer: FC<TimeContainerProps & DivProps> = ({ obj, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        className || ''
      } flexcentercol font-bold text-[2.5rem] mobile:text-[3rem] text-ctbg px-5`}
      {...props}
    >
      {obj?.createdAt && (
        <div className="">
          {t('create')}: {formatDate(obj.createdAt.seconds * 1000)}
        </div>
      )}
      {obj?.updatedAt && (
        <div className="">
          {t('update')}: {formatDate(obj.updatedAt.seconds * 1000)}
        </div>
      )}
    </div>
  );
};
