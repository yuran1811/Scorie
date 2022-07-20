import { FlatLoading } from '@cpns/icons';
import { FC } from 'react';

export const FullScreenLoading: FC = () => (
  <div className="z-40 flexcenter fullscreen bg-slate-900">
    <FlatLoading />
  </div>
);
