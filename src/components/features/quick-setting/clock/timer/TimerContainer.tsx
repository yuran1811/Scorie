import { useStore } from '@/store';
import { Button, Timer } from '@cpns/shared';
import { useState } from 'react';
import { TimerAddNew } from './TimerAddNew';

export const TimerContainer = () => {
  const timers = useStore((s) => s.timers);

  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-12">
        <Button
          className="itypo-3sm"
          content={!openAddModal ? 'Add' : 'Cancel'}
          onClick={() => setOpenAddModal((s) => !s)}
        />
        {openAddModal && <TimerAddNew setOpenAddModal={setOpenAddModal} />}
      </div>
      <div className="grid w-full grid-flow-row-dense grid-cols-1 items-center gap-3 space-y-4 medtab:grid-cols-2 smdesk:grid-cols-3">
        {timers.map(({ _id, data }) => (
          <Timer key={_id} _id={_id} timeLength={data.length} />
        ))}
      </div>
    </div>
  );
};
