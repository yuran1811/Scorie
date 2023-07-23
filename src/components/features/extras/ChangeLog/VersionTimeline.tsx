import { useChangeLogStore, useStore } from '@/store';
import { classnames } from '@/utils';
import { DoubleCheckIcon } from '@cpns/icons';
import { Overlay } from '@cpns/shared';
import { DivProps } from '@/shared';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import { VersionTimeStop } from './VersionTimeStop';

export const VersionTimeline: FC<DivProps> = ({ onClick }) => {
  const settings = useStore((s) => s.settings);
  const changeLogs = useChangeLogStore((s) => s.changeLogs);
  const changeLogsRead = useChangeLogStore((s) => s.changeLogsRead);
  const setChangeLogsRead = useChangeLogStore((s) => s.setChangeLogsRead);

  const allRead = changeLogs.filter((log) => changeLogsRead[log.version]).length === changeLogs.length;

  return createPortal(
    <div className="fullscreen flexcenter z-20 !justify-start">
      <Overlay zIdx="z-[-1]" onClick={onClick} />

      <div
        className={classnames(
          'typo-med scrollY relative m-auto max-h-[70vh] w-full max-w-[58rem] rounded-3xl border-4 border-violet-400/60 pb-8 text-gray-100',
          settings.glassmorphismDesign ? 'bg-gray-800/60 backdrop-blur-sm' : 'bg-gray-900'
        )}
      >
        <div
          className={classnames(
            'flexcenter typo-sm sticky top-0 z-20 cursor-pointer gap-4 px-8 py-4',
            settings.glassmorphismDesign
              ? 'bg-gradient-to-b from-gray-800 to-transparent backdrop-blur backdrop-brightness-75'
              : 'bg-inherit'
          )}
          onClick={() => {
            changeLogs.forEach((log) => setChangeLogsRead(log.version, !allRead));
          }}
        >
          <DoubleCheckIcon active={!allRead} height="24" width="24" />
          <span>Mark all as {allRead && 'un'}read</span>
        </div>
        <ul className="space-y-12 p-4 medmb:px-8">
          {changeLogs.map((log) => (
            <VersionTimeStop key={log.id} data={log} />
          ))}
        </ul>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
};
