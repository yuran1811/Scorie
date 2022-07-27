import { InboxIcon } from '@cpns/icons';
import { useState } from 'react';
import { ReportAddNew } from './ReportAddNew';

export const Report = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <InboxIcon
        className="my-4 mx-6 cursor-pointer"
        width="40"
        height="40"
        onClick={() => setOpenModal((s) => !s)}
      />

      {openModal && <ReportAddNew onClick={() => setOpenModal(false)} />}
    </>
  );
};
