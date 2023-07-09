import { InboxIcon } from '@cpns/icons';
import { useState } from 'react';
import { ReportAddNew } from './ReportAddNew';

export const Report = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <InboxIcon className="mx-6 my-4 cursor-pointer" width="32" height="32" onClick={() => setOpenModal((s) => !s)} />

      {openModal && <ReportAddNew clickHandle={() => setOpenModal(false)} />}
    </>
  );
};
