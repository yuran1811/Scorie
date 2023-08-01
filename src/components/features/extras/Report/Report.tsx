import { InboxIcon } from '@cpns/icons';
import { useState } from 'react';
import { ReportAddNew } from './ReportAddNew';

export const Report = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <InboxIcon className="mx-6 my-4 aspect-square w-12 cursor-pointer" onClick={() => setOpenModal((s) => !s)} />

      {openModal && <ReportAddNew clickHandle={() => setOpenModal(false)} />}
    </>
  );
};
