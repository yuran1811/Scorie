import { useStore } from '@/store';
import { formatDate, tabListStickyClass } from '@/utils';
import { Clock, TabUI } from '@cpns/shared';
import { SVGProps } from 'react';
import { ClockStyleSelect, TimerContainer, TimerStyle } from '.';
import { QuickSettingTabUI } from '../QuickSettingTabUI';

const TimerSandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6 2h12v6l-4 4l4 4v6H6v-6l4-4l-4-4V2m10 14.5l-4-4l-4 4V20h8v-3.5m-4-5l4-4V4H8v3.5l4 4M10 6h4v.75l-2 2l-2-2V6Z"
    />
  </svg>
);

const TimerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"
    ></path>
  </svg>
);

const DateTimeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"
    ></path>
  </svg>
);

const StyleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M17.5 3C15.57 3 14 4.57 14 6.5V8h-4V6.5C10 4.57 8.43 3 6.5 3S3 4.57 3 6.5S4.57 10 6.5 10H8v4H6.5C4.57 14 3 15.57 3 17.5S4.57 21 6.5 21s3.5-1.57 3.5-3.5V16h4v1.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5H16v-4h1.5c1.93 0 3.5-1.57 3.5-3.5S19.43 3 17.5 3zM16 8V6.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S18.33 8 17.5 8H16zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5S8 5.67 8 6.5V8H6.5zm3.5 6v-4h4v4h-4zm7.5 5c-.83 0-1.5-.67-1.5-1.5V16h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm-11 0c-.83 0-1.5-.67-1.5-1.5S5.67 16 6.5 16H8v1.5c0 .83-.67 1.5-1.5 1.5z"
    ></path>
  </svg>
);

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
            Component: <div></div>,
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
