import { FlatLoading } from '@cpns/icons';
import { FC } from 'react';

export const FullScreenLoading: FC = () => (
  <div className="flexcenter fullscreen z-40 bg-zinc-950/90">
    <FlatLoading />
  </div>
);
