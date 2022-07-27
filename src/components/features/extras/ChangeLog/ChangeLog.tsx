import { MessageIcon } from '@cpns/icons';
import { useState } from 'react';
import { VersionTimeline } from './VersionTimeline';

export const ChangeLog = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <MessageIcon
        className="my-4 mx-6 cursor-pointer"
        width="40"
        height="40"
        onClick={() => setOpenModal((s) => !s)}
      />

      {openModal && <VersionTimeline onClick={() => setOpenModal(false)} />}
    </div>
  );
};
