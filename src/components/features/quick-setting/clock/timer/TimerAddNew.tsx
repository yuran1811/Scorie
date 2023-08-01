import { useStore } from '@/store';
import { getUniqueId } from '@/utils';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const timeIndices = ['h', 'm', 's'];

export const TimerAddNew: FC<{ setOpenAddModal: any }> = ({ setOpenAddModal }) => {
  const timers = useStore((s) => s.timers);
  const setTimers = useStore((s) => s.setTimers);

  const { t } = useTranslation();

  const [newTimer, setNewTimer] = useState('000000');

  const timerDisplayRaw = '000000'.slice(0, Math.max(6 - newTimer.length, 0)) + newTimer.slice(-6, newTimer.length);
  const timerDisplay = timerDisplayRaw.split('').reduce(
    (prev, cur, idx) => {
      const prevKey = timeIndices[Math.floor(idx / 2)];

      if (idx % 2) {
        prev[prevKey] += cur;
      } else {
        prev[prevKey] = '' + cur;
      }

      return prev;
    },
    {} as Record<string, string>,
  );

  return (
    <div className="flexcenter relative mx-auto w-max gap-4">
      <div className="relative w-60">
        <div className="flexcenter">
          {Object.entries(timerDisplay).map(([key, val]) => (
            <p className="mx-1" key={key}>
              <span className="typo">{val}</span>
              <span className="typo-2sm">{key}</span>
            </p>
          ))}
        </div>
        <input
          id="timerAddInput"
          className="absolute left-0 top-0 w-full opacity-0"
          type="number"
          inputMode="decimal"
          value={newTimer}
          onChange={(e) => {
            const value = e.currentTarget.value || '';
            setNewTimer('000000'.slice(0, Math.max(6 - value.length, 0)) + value.slice(-6, value.length));
          }}
        />
      </div>
      <button
        className="aspect-square h-14 rounded-full bg-violet-800"
        onClick={() => {
          if (!+newTimer) return;

          const timerLength =
            [...timeIndices].reverse().reduce((prev, cur, idx) => {
              prev += +timerDisplay[cur] * 60 ** idx;
              return prev;
            }, 0) * 1000;

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
      >
        +
      </button>
      <label
        htmlFor="timerAddInput"
        className="typo-5sm absolute -bottom-10 left-0 right-0 animate-pulse text-center font-semibold uppercase"
      >
        {t('click and type to add')}
      </label>
    </div>
  );
};
