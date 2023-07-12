import { useAppStatus } from '@/contexts';
import { MessageIcon } from '@cpns/icons';
import { Badge } from '@cpns/shared';
import { useState } from 'react';
import { VersionTimeline } from './VersionTimeline';

export const ChangeLog = () => {
  const [openModal, setOpenModal] = useState(false);

  const { status } = useAppStatus();

  return (
    <>
      <div className="relative">
        <MessageIcon
          className="scale-typo mx-6 my-4 cursor-pointer"
          width="27"
          height="27"
          onClick={() => setOpenModal((s) => !s)}
        />
        <Badge className="!-top-4 !right-0 scale-75 bg-rose-600">{status.badges.changeLog}</Badge>
      </div>

      {openModal && <VersionTimeline onClick={() => setOpenModal(false)} />}
    </>
  );
};
