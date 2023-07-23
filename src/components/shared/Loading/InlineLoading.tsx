import { DivProps } from '@/shared';
import { classnames } from '@/utils';
import { ThreeDotsFade } from '@cpns/icons';
import { FC } from 'react';

export const InlineLoading: FC<DivProps> = ({ className = '' }) => (
  <div className={classnames('flexcenter m-4 h-[10rem] w-full p-4', className)}>
    <ThreeDotsFade />
  </div>
);
