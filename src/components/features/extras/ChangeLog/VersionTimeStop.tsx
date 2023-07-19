import { useChangeLogStore, useStore } from '@/store';
import { changeLogStyle, classnames, formatDate } from '@/utils';
import { DoubleCheckIcon } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { ChangeLogProps } from '@shared/types';
import { FC } from 'react';

interface VersionTimeStopProps {
  data: ChangeLogProps;
}

export const VersionTimeStop: FC<VersionTimeStopProps> = ({ data: { content, time, title, type, version } }) => {
  const currentUser = useStore((s) => s.currentUser);
  const changeLogsRead = useChangeLogStore((s) => s.changeLogsRead);
  const setChangeLogsRead = useChangeLogStore((s) => s.setChangeLogsRead);

  return (
    <li className="typo-sm relative flex items-start space-x-3 before:absolute before:-bottom-8 before:left-14 before:top-12 before:h-full before:w-2 before:bg-gray-700">
      <span className="typo-2sm flexcenter relative z-10 rounded-3xl bg-gray-800 p-4 before:absolute before:-bottom-[2px] before:h-[4px] before:w-3/5 before:rounded-lg before:bg-violet-400 after:absolute after:-top-[2px] after:h-[4px] after:w-3/5 after:rounded-lg after:bg-violet-400">
        {version}
      </span>
      <div className="flex-1 space-y-2">
        <div className="flex flex-col items-start justify-start text-gray-400">
          <div
            className="typo-3sm relative my-1 flex items-center rounded-full border-2 p-1 smmb:m-0 smmb:px-4"
            style={{
              backgroundColor: changeLogStyle[type]?.color || '#a78bfa',
              borderColor: changeLogStyle[type]?.bg || '#374151',
            }}
          >
            <span
              aria-hidden="true"
              className="h-6 w-6 rounded-full smmb:mr-4"
              style={{ backgroundColor: changeLogStyle[type]?.bg || '#374151' }}
            />
            <span className="hidden pr-2 smmb:block" style={{ color: changeLogStyle[type]?.bg || '#374151' }}>
              {title}
            </span>

            <div
              className={classnames(
                'absolute -right-16 cursor-pointer smmb:-right-16',
                currentUser && currentUser?.uid ? '' : '!hidden'
              )}
            >
              <Tooltip content={!!changeLogsRead[version] ? 'Mark as unread' : 'Mark as read'}>
                <div onClick={() => setChangeLogsRead(version, !changeLogsRead[version])}>
                  <DoubleCheckIcon active={!!changeLogsRead[version]} height="24" width="24" />
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="typo-3sm">{formatDate(time.seconds * 1000, 'ddd, DD/MM/YYYY - H:mm')}</div>
        </div>
        <div className="flexcentercol typo-3sm !justify-start">
          <div className="w-full tracking-wide smmb:indent-8">{content}</div>
        </div>
      </div>
    </li>
  );
};
