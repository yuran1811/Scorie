import { DivProps } from '@/shared';
import { formatDate } from '@/utils';
import { Timestamp } from 'firebase/firestore';
import { FC } from 'react';

interface TimeContainerProps {
  obj: {
    createdAt?: Timestamp | undefined | null;
    updatedAt?: Timestamp | undefined | null;
  };
}

export const TimeContainer: FC<TimeContainerProps & DivProps> = ({ obj, className, ...props }) => (
  <div
    className={`${
      className || ''
    } flexcentercol font-bold text-[2.6rem] mobile:text-[3rem] text-ctbg px-5`}
    {...props}
  >
    {obj?.createdAt && <div className="">Create: {formatDate(obj.createdAt.seconds * 1000)}</div>}
    {obj?.updatedAt && <div className="">Update: {formatDate(obj.updatedAt.seconds * 1000)}</div>}
  </div>
);
