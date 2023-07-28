import { WeatherPanel } from '@cpns/shared';
import { SVGProps } from 'react';
import { QuickSettingTabUI } from './QuickSettingTabUI';
import { ClockPanel } from './clock';
import { QuickSettingPanel } from './settings';

const WeatherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path
      fill="currentColor"
      d="M21.503 40a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm-13.5-2a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3ZM26 12.01c6.337 0 9.932 4.194 10.455 9.26h.16c4.078 0 7.384 3.297 7.384 7.364c0 4.068-3.306 7.365-7.385 7.365H15.386c-4.078 0-7.384-3.297-7.384-7.365c0-4.067 3.306-7.365 7.384-7.365h.16c.526-5.099 4.118-9.26 10.455-9.26ZM7.569 20.19a1.75 1.75 0 0 1-.499 2.3l-.142.09l-1.299.75a1.75 1.75 0 0 1-1.892-2.94l.142-.09l1.3-.75a1.75 1.75 0 0 1 2.39.64Zm14.14-9.528c-3.801 1.22-6.509 4.09-7.62 7.921l-.094.341l-.116.476l-.412.077a9.278 9.278 0 0 0-3.341 1.43A7.883 7.883 0 0 1 21.71 10.662ZM5.505 9.978l.132.056l1.36.634a1.75 1.75 0 0 1-1.347 3.227l-.132-.055l-1.36-.634a1.75 1.75 0 0 1 1.347-3.228Zm19.11-5.762a1.75 1.75 0 0 1 .508 2.317l-.078.12l-.86 1.23a1.75 1.75 0 0 1-2.945-1.887l.078-.121l.86-1.229a1.75 1.75 0 0 1 2.438-.43Zm-10.291-.419l.065.156l.513 1.41a1.75 1.75 0 0 1-3.224 1.352l-.065-.156l-.513-1.41a1.75 1.75 0 0 1 3.224-1.352Z"
    />
  </svg>
);

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" {...props}>
    <path
      fill="currentColor"
      d="m61.66 29.66l-32 32a8 8 0 0 1-11.32-11.32l32-32a8 8 0 1 1 11.32 11.32Zm176 20.68l-32-32a8 8 0 0 0-11.32 11.32l32 32a8 8 0 0 0 11.32-11.32ZM224 128a96 96 0 1 1-96-96a96.11 96.11 0 0 1 96 96Zm-32 0a8 8 0 0 0-8-8h-48V72a8 8 0 0 0-16 0v56a8 8 0 0 0 8 8h56a8 8 0 0 0 8-8Z"
    />
  </svg>
);

const SettingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M9.954 2.21a9.99 9.99 0 0 1 4.09-.002A3.993 3.993 0 0 0 16 5.07a3.992 3.992 0 0 0 3.457.261A9.988 9.988 0 0 1 21.5 8.877a3.992 3.992 0 0 0-1.5 3.122c0 1.264.586 2.391 1.501 3.124a10.042 10.042 0 0 1-2.045 3.543a3.992 3.992 0 0 0-3.456.261a3.993 3.993 0 0 0-1.955 2.86a9.99 9.99 0 0 1-4.09.004A3.993 3.993 0 0 0 8 18.927a3.992 3.992 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121A3.992 3.992 0 0 0 4 11.999c0-1.264-.587-2.39-1.502-3.124a10.043 10.043 0 0 1 2.045-3.542A3.993 3.993 0 0 0 8 5.07a3.993 3.993 0 0 0 1.954-2.86ZM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
    />
  </svg>
);

export const QuickSettingSection = () => {
  return (
    <div className="container mx-auto my-28 w-full p-4">
      <QuickSettingTabUI
        tabListClass="flexcenter mx-auto flex-wrap gap-2 medmb:gap-8"
        tabIcon={[
          <ClockIcon className="aspect-square w-8" />,
          <WeatherIcon className="aspect-square w-8" />,
          <SettingIcon className="aspect-square w-8" />,
        ]}
        tabList={['Clock', 'Weather', 'Settings']}
        panelList={[
          {
            _id: 'clock_panel',
            Component: <ClockPanel />,
          },
          {
            _id: 'weather_panel',
            Component: <WeatherPanel />,
          },
          {
            _id: 'quicksetting_panel',
            Component: <QuickSettingPanel />,
          },
        ]}
      />
    </div>
  );
};
