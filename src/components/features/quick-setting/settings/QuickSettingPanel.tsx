import { classnames } from '@/utils';
import { SettingInfo } from '@cpns/features/panel/setting/SettingInfo';
import { Button, PlanPurchase } from '@cpns/shared';
import { useState } from 'react';

export const QuickSettingPanel = () => {
  const [activeStatus, setActiveStatus] = useState({
    showAppSettings: false,
    showPlanPurchase: false,
  });

  return (
    <div
      className={classnames(
        'flex flex-col items-center justify-start gap-8 medtab:items-start medtab:justify-center',
        activeStatus.showAppSettings && activeStatus.showPlanPurchase ? 'medtab:flex-row' : ''
      )}
    >
      <div className="w-full">
        <Button
          content="App settings"
          className="font-bold"
          onClick={() => setActiveStatus((s) => ({ ...s, showAppSettings: !s.showAppSettings }))}
        />
        {activeStatus.showAppSettings && <SettingInfo />}
      </div>
      <div className="w-full">
        <Button
          content="Plans"
          className="font-bold"
          onClick={() => setActiveStatus((s) => ({ ...s, showPlanPurchase: !s.showPlanPurchase }))}
        />
        {activeStatus.showPlanPurchase && <PlanPurchase />}
      </div>
    </div>
  );
};
