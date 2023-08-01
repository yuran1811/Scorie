import { useStore } from '@/store';
import { classnames } from '@/utils';
import { TrashIcon } from '@cpns/icons';
import { FC, useEffect, useState } from 'react';
import { BarTimer } from './BarTimer';

interface TimerProps {
  _id: string;
  timeLength: number;
  style?: string;
}

interface TimerStatusType {
  paused: boolean;
  timeoutId: any;
  addedTime: number;
}

const randomTimerSub = () => Math.random() * 100 + 10;

export const Timer: FC<TimerProps> = ({ _id, timeLength, style = 'bar' }) => {
  const timers = useStore((s) => s.timers);
  const setTimers = useStore((s) => s.setTimers);

  const [timeDelta, setTimeDelta] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatusType>({
    paused: true,
    timeoutId: undefined,
    addedTime: 0,
  });

  const realTimeLength = timeLength + timerStatus.addedTime;

  const deleteTimer = () => {
    const isFound = timers.findIndex((_) => _._id === _id);

    if (isFound !== -1) {
      const x = [...timers];
      x.splice(isFound, 1);
      setTimers(x);
    }
  };

  useEffect(() => {
    if (timerStatus.paused || timeDelta >= realTimeLength) {
      clearTimeout(timerStatus.timeoutId);

      if (timeDelta >= realTimeLength) {
        setTimeDelta(realTimeLength);
        setTimerStatus((s) => ({ ...s, paused: true, addedTime: 0 }));
      }

      return;
    }

    const randTime = randomTimerSub();
    const timeoutId = setTimeout(() => {
      setTimeDelta((s) => s + randTime);
    }, randTime);

    setTimerStatus((s) => ({ ...s, timeoutId }));
  }, [timeDelta, timerStatus.paused]);

  return (
    <div className="group relative mx-auto w-max rounded-3xl border-4 border-violet-400 px-6 py-4">
      <div
        className="flexcenter isAnimated absolute -right-4 -top-4 aspect-square w-14 cursor-pointer rounded-full bg-rose-700 opacity-40 group-hover:opacity-100"
        onClick={() => {
          deleteTimer();
        }}
      >
        <TrashIcon className="aspect-square w-6" />
      </div>
      <BarTimer delta={timeDelta} length={realTimeLength} />
      <div className="flexcenter typo-4sm mt-5 gap-2">
        <div
          className={classnames(
            'w-max cursor-pointer rounded-3xl bg-ctcolor px-4 py-2 font-bold text-ctbg',
            timeDelta >= realTimeLength ? 'hidden' : '',
          )}
          onClick={() => {
            setTimerStatus((s) => ({ ...s, addedTime: s.addedTime + 60 * 1000 }));
          }}
        >
          + 1min
        </div>
        <div
          className="w-max cursor-pointer rounded-3xl bg-ctcolor px-4 py-2 font-bold text-ctbg"
          onClick={() => {
            setTimerStatus((s) => ({ ...s, addedTime: 0, paused: true }));
            setTimeDelta(0);
          }}
        >
          Reset
        </div>

        <div
          className={classnames(
            'w-max cursor-pointer rounded-3xl bg-ctcolor px-4 py-2 font-bold text-ctbg',
            timeDelta >= realTimeLength ? 'hidden' : '',
          )}
          onClick={() => setTimerStatus((s) => ({ ...s, paused: !s.paused }))}
        >
          {timerStatus.paused ? 'Start' : 'Pause'}
        </div>
      </div>
    </div>
  );
};
