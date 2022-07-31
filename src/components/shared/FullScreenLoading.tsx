import { FlatLoading } from '@cpns/icons';
import { FC } from 'react';

export const FullScreenLoading: FC = () => (
  <div className="flexcenter fullscreen z-40 bg-slate-900">
    <FlatLoading />
  </div>
);
