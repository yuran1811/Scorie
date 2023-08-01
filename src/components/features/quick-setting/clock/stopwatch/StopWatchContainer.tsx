import { LapseListType } from '@/shared';
import { useEffect, useState } from 'react';
import { LapseHistory, StopWatchController, StopWatchUI } from '.';

const randomTimerSub = () => Math.random() * 50 + 10;

export const StopWatchContainer = () => {
  const [timeLth, setTimeLth] = useState(0);
  const [stopW, setStopW] = useState<{ paused: boolean; timeoutId: any }>({
    paused: true,
    timeoutId: undefined,
  });
  const [lapses, setLapses] = useState<LapseListType>([]);

  useEffect(() => {
    if (stopW.paused) {
      clearTimeout(stopW.timeoutId);
      return;
    }

    const randTime = randomTimerSub();
    const timeoutId = setTimeout(() => {
      setTimeLth((s) => s + randTime);
    }, randTime);

    setStopW((s) => ({ ...s, timeoutId }));
  }, [stopW.paused, timeLth]);

  return (
    <div className="flexcentercol container mx-auto">
      <StopWatchUI timeLth={timeLth} />
      <LapseHistory lapses={lapses} />
      <StopWatchController
        states={{
          timeLth,
          start: !stopW.paused,
        }}
        callbacks={{
          restart: () => {
            setTimeLth(0);
            setLapses([]);
            setStopW((s) => ({ ...s, paused: true }));
          },
          start: () => {
            setStopW((s) => ({ ...s, paused: !s.paused }));
          },
          lapse: () => {
            if (lapses[0]?.timestamp === timeLth) return;

            const lastLapse = lapses[0]?.timestamp || 0;
            setLapses((s) => [{ id: s.length + 1, timestamp: timeLth, lapseTime: timeLth - lastLapse }, ...s]);
          },
        }}
      />
    </div>
  );
};
