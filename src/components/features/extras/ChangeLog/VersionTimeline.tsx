import { useStore } from '@/store';
import { Overlay } from '@cpns/shared';
import { DivProps } from '@shared/types';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import { VersionTimeStop } from './VersionTimeStop';

export const VersionTimeline: FC<DivProps> = ({ onClick }) => {
  const changeLogs = useStore((s) => s.changeLogs);

  return createPortal(
    <div className="fullscreen flexcenter z-[20] !justify-start">
      <Overlay zIdx="z-[-1]" onClick={onClick} />

      <div className="scrollY relative m-auto max-h-[80vh] max-w-[50rem] rounded-3xl border-4 border-violet-400 bg-gray-800 p-8 text-gray-100">
        <ul className="space-y-12">
          {changeLogs.map((log) => (
            <VersionTimeStop key={log.id} data={log} />
          ))}
        </ul>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
};
