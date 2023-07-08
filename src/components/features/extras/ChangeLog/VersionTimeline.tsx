import { useChangeLogStore } from '@/store';
import { DoubleCheckIcon } from '@cpns/icons';
import { Overlay } from '@cpns/shared';
import { DivProps } from '@shared/types';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { VersionTimeStop } from './VersionTimeStop';

export const VersionTimeline: FC<DivProps> = ({ onClick }) => {
  const changeLogs = useChangeLogStore((s) => s.changeLogs);
  const changeLogsRead = useChangeLogStore((s) => s.changeLogsRead);
  const setChangeLogsRead = useChangeLogStore((s) => s.setChangeLogsRead);

  const allRead = changeLogs.filter((log) => changeLogsRead[log.version]).length === changeLogs.length;

  return createPortal(
    <div className="fullscreen flexcenter z-20 !justify-start">
      <Overlay zIdx="z-[-1]" onClick={onClick} />

      <div className="scrollY relative m-auto max-h-[80vh] w-full max-w-[58rem] rounded-3xl border-4 border-violet-400/70 bg-gray-800/40 pb-8 text-gray-100 backdrop-blur-md">
        <div
          className="flexcenter typo-med sticky top-0 z-20 cursor-pointer gap-4 bg-gradient-to-b from-gray-800/50 to-black/30 px-8 py-4 backdrop-blur-2xl"
          onClick={() => {
            changeLogs.forEach((log) => setChangeLogsRead(log.version, !allRead));
          }}
        >
          <DoubleCheckIcon active={!allRead} height="25" width="25" />
          <span>Mark all as {allRead && 'un'}read</span>
        </div>

        <ul className="space-y-12 px-8 pt-4">
          {changeLogs.map((log) => (
            <VersionTimeStop key={log.id} data={log} />
          ))}
        </ul>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
};
