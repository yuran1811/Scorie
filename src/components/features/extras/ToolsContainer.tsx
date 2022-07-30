import { useStore } from '@/store';
import { Tooltip } from '@cpns/shared';
import { FC } from 'react';
import ChangeLang from './ChangeLang/ChangeLang';
import { ChangeLog } from './ChangeLog/ChangeLog';
import { NotificationWrapper } from './Notification/Notification';
import { Report } from './Report/Report';
import { ShareContainer } from './Share/ShareContainer';

interface ToolsContainerProps {
  showMore: boolean;
}

export const ToolsContainer: FC<ToolsContainerProps> = ({ showMore, ...otherPropss }) => {
  const currentUser = useStore((s) => s.currentUser);

  return (
    <div
      {...otherPropss}
      className={`${
        showMore ? 'flex' : 'hidden'
      } absolute right-[1rem] top-[9rem] flex-col items-center justify-start rounded-[1.5rem] border-l-[0.5rem] border-b-[0.5rem] border-indigo-200 bg-ctbg`}
    >
      <Tooltip content="Turn on/off notification">
        <NotificationWrapper />
      </Tooltip>

      <Tooltip content="Change logs">
        <ChangeLog />
      </Tooltip>

      {currentUser && currentUser?.uid && (
        <Tooltip content="Report bugs">
          <Report />
        </Tooltip>
      )}

      <Tooltip content="Share">
        <ShareContainer />
      </Tooltip>

      {/* <Tooltip content="Sync status">
        <SyncStatus />
      </Tooltip> */}

      <Tooltip content="Change language">
        <ChangeLang />
      </Tooltip>
    </div>
  );
};
