import { classnames } from '@/utils';
import { PauseTimerIcon, RestartTimerIcon, StartTimerIcon, TimerIcon } from '@cpns/icons';
import { FC } from 'react';

interface StopWatchControllerProps {
  states: Record<'timeLth' | 'start', any>;
  callbacks: Record<'restart' | 'start' | 'lapse', any>;
}

const controllerClass = 'flexcenter col-span-1 aspect-square cursor-pointer rounded-full';

export const StopWatchController: FC<StopWatchControllerProps> = ({ states, callbacks }) => {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center gap-6">
      {!!states.timeLth && (
        <div className={classnames(controllerClass, 'col-start-1 w-16 bg-violet-500')} onClick={callbacks.restart}>
          <RestartTimerIcon className="aspect-square w-10" />
        </div>
      )}

      <div className={classnames(controllerClass, 'col-start-2 w-20 bg-violet-800')} onClick={callbacks.start}>
        {!states.start ? (
          <StartTimerIcon className="aspect-square w-12" />
        ) : (
          <PauseTimerIcon className="aspect-square w-12" />
        )}
      </div>

      {!!states.timeLth && states.start && (
        <div className={classnames(controllerClass, 'col-start-3 w-16 bg-violet-500')} onClick={callbacks.lapse}>
          <TimerIcon className="aspect-square w-10" />
        </div>
      )}
    </div>
  );
};
