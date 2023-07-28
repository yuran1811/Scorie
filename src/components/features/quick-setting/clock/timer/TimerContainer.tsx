import { useStore } from '@/store';
import { getUniqueId } from '@/utils';
import { Button, Input, Timer } from '@cpns/shared';
import { useState } from 'react';

export const TimerContainer = () => {
  const timers = useStore((s) => s.timers);
  const setTimers = useStore((s) => s.setTimers);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newTimer, setNewTimer] = useState('');

  return (
    <div className="w-full">
      <div className="mb-12">
        <Button
          className="itypo-3sm"
          content={!openAddModal ? 'Add' : 'Cancel'}
          onClick={() => setOpenAddModal((s) => !s)}
        />
        {openAddModal && (
          <div className="flexcenter mx-auto w-max gap-4">
            <Input
              type="number"
              inputMode="decimal"
              placeholder="split by :"
              value={newTimer}
              className="max-w-xs"
              onChange={(e) => setNewTimer(e.currentTarget.value || '')}
            />
            <Button
              className="itypo-3sm"
              content="Add"
              onClick={() => {
                const timerLength = +newTimer * 1000;

                setTimers([
                  {
                    _id: getUniqueId(),
                    data: { current: timerLength, length: timerLength },
                  },
                  ...timers,
                ]);
                setOpenAddModal(false);
                setNewTimer('');
              }}
            />
          </div>
        )}
      </div>
      <div className="grid w-full grid-flow-row-dense grid-cols-1 items-center gap-3 space-y-4 medtab:grid-cols-2 smdesk:grid-cols-3">
        {timers.map(({ _id, data }) => (
          <Timer key={_id} _id={_id} timeLength={data.length} />
        ))}
      </div>
    </div>
  );
};
