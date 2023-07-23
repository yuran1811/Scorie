import { DivProps } from '@/shared';
import { FC } from 'react';

export const FlatLoading: FC<DivProps> = ({ className = '' }) => (
  <div style={{ perspective: '100px' }} className={className}>
    <div className="h-[5rem] w-[5rem] rotate-0 animate-flatLoading bg-red-400"></div>
  </div>
);
