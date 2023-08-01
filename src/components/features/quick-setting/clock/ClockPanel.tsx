import { useStore } from '@/store';
import { formatDate } from '@/utils';
import { DateTimeIcon, StyleIcon, TimerIcon, TimerSandIcon } from '@cpns/icons';
import { Clock } from '@cpns/shared';
import { ClockStyleSelect, StopWatchContainer, TimerContainer, TimerStyle } from '.';
import { QuickSettingTabUI } from '../QuickSettingTabUI';

export const ClockPanel = () => {
  const clockStyle = useStore((s) => s.clockStyle);

  return (
    <div className="typo-2sm flex flex-col items-center justify-start">
      <QuickSettingTabUI
        tabIcon={[
          <DateTimeIcon className="aspect-square w-8" />,
          <TimerSandIcon className="aspect-square w-8" />,
          <TimerIcon className="aspect-square w-8" />,
          <StyleIcon className="aspect-square w-8" />,
        ]}
        tabList={['Date & Time', 'Timer', 'Stopwatch', 'Clock style']}
        panelList={[
          {
            _id: 'date_time',
            Component: (
              <div className="flex min-h-[15rem] flex-col items-center justify-start">
                <div className="relative left-0 top-6 mx-auto h-[2.5rem] origin-top scale-[2.8] medtab:h-[5rem] medtab:scale-[3.5]">
                  <Clock type={clockStyle.type} />
                </div>
                <div className="mt-52 font-semibold">{formatDate(Date.now(), 'ddd, DD/MM/YY')}</div>
              </div>
            ),
          },
          {
            _id: 'timer',
            Component: (
              <div className="flexcentercol w-full">
                <QuickSettingTabUI
                  tabList={['All timers', 'Timer style']}
                  panelList={[
                    {
                      _id: 'alltimers',
                      Component: <TimerContainer />,
                    },
                    {
                      _id: 'timerstyles',
                      Component: <TimerStyle />,
                    },
                  ]}
                />
              </div>
            ),
          },
          {
            _id: 'stopwatch',
            Component: <StopWatchContainer />,
          },
          {
            _id: 'clock_style',
            Component: (
              <div className="flex min-h-[20rem] flex-col items-center justify-start">
                <div className="relative left-0 top-6 mx-auto h-[3rem] origin-top scale-[2.8]">
                  <Clock type={clockStyle.type} />
                </div>
                <ClockStyleSelect />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};
