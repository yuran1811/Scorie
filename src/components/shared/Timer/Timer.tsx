import { useStore } from '@/store';
import { classnames } from '@/utils';
import { AddIcon, PauseTimerIcon, RestartTimerIcon, StartTimerIcon, TrashIcon } from '@cpns/icons';
import { FC, useEffect, useState } from 'react';
import { SelectInput } from '../SelectInput';
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

  const [timeAdded, setTimeAdded] = useState(30);
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
    <div className="relative mx-auto w-max rounded-[2.6rem] border-4 border-violet-400 p-4">
      <div
        className="flexcenter isAnimated absolute -right-4 -top-4 aspect-square w-14 cursor-pointer rounded-full bg-rose-700"
        onClick={() => {
          deleteTimer();
        }}
      >
        <TrashIcon className="aspect-square w-6" />
      </div>
      <BarTimer delta={timeDelta} length={realTimeLength} />
      <div className="flexcenter typo-4sm mt-5 gap-2">
        <div
          className="flexcenter cursor-pointer rounded-full bg-ctcolor p-2 text-ctbg"
          onClick={() => {
            setTimerStatus((s) => ({ ...s, addedTime: 0, paused: true }));
            setTimeDelta(0);
          }}
        >
          <RestartTimerIcon className="aspect-square w-8" />
        </div>
        <div
          className={classnames(
            'flexcenter cursor-pointer rounded-full bg-ctcolor p-2 text-ctbg',
            timeDelta >= realTimeLength ? 'hidden' : '',
          )}
          onClick={() => setTimerStatus((s) => ({ ...s, paused: !s.paused }))}
        >
          {timerStatus.paused ? (
            <StartTimerIcon className="aspect-square w-8" />
          ) : (
            <PauseTimerIcon className="aspect-square w-8" />
          )}
        </div>
        <div className={classnames('flexcenter mx-2', timeDelta >= realTimeLength ? 'hidden' : '')}>
          <AddIcon
            className="mr-2 aspect-square w-10 cursor-pointer rounded-full bg-violet-800 px-2"
            onClick={() => setTimerStatus((s) => ({ ...s, addedTime: s.addedTime + timeAdded }))}
          />
          <SelectInput
            list={[
              { _id: '30s', data: '30s' },
              { _id: '1min', data: '1min' },
              { _id: '30min', data: '30min' },
              { _id: '1h', data: '1h' },
            ]}
            defaultSelected={'30s'}
            setWhenSelected={(val: string) => {
              const addedTime = +(val.match(/\d+/)?.[0] || 0);
              const unit = val.match(/[^\d+]+/)?.[0] || '';

              let _pow: number;
              switch (unit) {
                case 'min':
                  _pow = 1;
                  break;
                case 'h':
                  _pow = 2;
                  break;
                default:
                  _pow = -1;
                  break;
              }

              setTimeAdded(addedTime * (_pow < 0 ? 1 : 60 ** _pow) * 1000);
            }}
          />
        </div>
      </div>
    </div>
  );
};
