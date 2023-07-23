import { useStore } from '@/store';
import { Clock } from '@cpns/shared';
import { useState } from 'react';
import { ClockStyleSelect } from '.';

export const ClockPanel = () => {
  const clockStyle = useStore((s) => s.clockStyle);
  const [settings, setSettings] = useState({
    showStylePick: false,
  });

  return (
    <div className="typo-2sm relative flex min-h-[22rem] flex-col items-center justify-start">
      <div
        className="relative left-0 top-6 mx-auto mb-6 h-[5rem] origin-top scale-[3.5] cursor-pointer"
        onClick={() => setSettings({ ...settings, showStylePick: !settings.showStylePick })}
      >
        <Clock type={clockStyle.type} />
      </div>

      {settings.showStylePick && <ClockStyleSelect />}
    </div>
  );
};
