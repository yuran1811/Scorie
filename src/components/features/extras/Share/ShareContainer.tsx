import { ShareIcon } from '@cpns/icons';
import { useState } from 'react';
import { QRCode } from './QRCode';

export const ShareContainer = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ShareIcon
        className="my-4 mx-6 cursor-pointer"
        width="40"
        height="40"
        onClick={() => setOpenModal((s) => !s)}
      />

      {openModal && <QRCode onClick={() => setOpenModal(false)} />}
    </>
  );
};
