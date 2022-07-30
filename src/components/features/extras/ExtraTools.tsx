import { useCollectionQuery } from '@/hooks';
import { useStore } from '@/store';
import { getChangeLogs } from '@/utils';
import { Avatar } from '@cpns/shared';
import { ToastDefaultConfig } from '@shared/constants';
import { db } from '@shared/firebase';
import Tippy from '@tippyjs/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { FC, useEffect, useRef, useState } from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';
import { ToolsContainer } from './ToolsContainer';

const toastConfig: ToastOptions = {
  ...ToastDefaultConfig,
  autoClose: 2000,
  position: 'top-center',
  progress: 1,
  toastId: 'change_logs_status',
};

export const ExtraTools: FC = () => {
  const currentUser = useStore((s) => s.currentUser);
  const changeLogs = useStore((s) => s.changeLogs);
  const changeLogsRead = useStore((s) => s.changeLogsRead);
  const setChangeLogs = useStore((s) => s.setChangeLogs);

  const [showMore, setShowMore] = useState(false);
  const [showLogWarn, setShowLogWarn] = useState(false);

  const toastId = useRef<Id | null>(null);

  const { data, loading, error } = useCollectionQuery(
    'change_logs',
    query(collection(db, 'change_logs'), orderBy('time', 'desc'))
  );

  useEffect(() => {
    setShowLogWarn(!loading);
    if (loading || error || data === null) return;
    setChangeLogs(getChangeLogs(data));
  }, [data, loading, error]);

  useEffect(() => {
    if (!currentUser || !currentUser?.uid || !showLogWarn) return;

    const unreadLog = changeLogs.filter((log) => !changeLogsRead[log.version]);

    if (unreadLog.length) {
      toastId.current = toast.info(
        `${unreadLog.length} unread log${unreadLog.length > 1 ? 's' : ''}`,
        { ...toastConfig }
      );
      toastId.current &&
        toast.update(toastId.current, {
          type: toast.TYPE.INFO,
          render: `${unreadLog.length} unread log${unreadLog.length > 1 ? 's' : ''}`,
          progress: 1,
        });
    }

    if (!unreadLog.length) {
      toastId.current = toast.success('All change logs have read', { ...toastConfig });
      toastId.current &&
        toast.update(toastId.current, {
          type: toast.TYPE.SUCCESS,
          render: 'All change logs have read',
          progress: 0,
        });
    }
  }, [changeLogs, changeLogsRead, currentUser, showLogWarn]);

  return (
    <div className="custom-tippy">
      <Tippy
        interactive
        visible={showMore}
        placement="bottom-end"
        onClickOutside={() => setShowMore(false)}
        render={(attrs) => <ToolsContainer {...attrs} showMore={showMore} />}
      >
        <div className="flex h-[5.5rem] w-[9.5rem] items-center justify-end">
          <Avatar
            className="absolute right-0 mx-8 cursor-pointer"
            imgUrl=""
            radius="5.5rem"
            onClick={() => setShowMore((a) => !a)}
          />
        </div>
      </Tippy>
    </div>
  );
};
