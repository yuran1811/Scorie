import { useStore } from '@/store';
import { classnames } from '@/utils';
import { SettingInfo } from '@cpns/features/panel/setting/SettingInfo';
import { PlanPurchase, SelectInput, SwitchBtn } from '@cpns/shared';
import { QuickSettingPositionType } from '@shared/types';
import { QuickSettingTabUI } from '../QuickSettingTabUI';

export const QuickSettingPanel = () => {
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);

  return (
    <div className={classnames('flexcentercol')}>
      <QuickSettingTabUI
        tabList={['Config', 'App settings', 'Plans']}
        panelList={[
          {
            _id: 'config',
            Component: (
              <div className="flexcentercol typo-2sm w-full mt-6 space-y-5">
                <div className="flexcenter w-full gap-4">
                  <p className="font-semibold">Minimize UI</p>
                  <SwitchBtn
                    containterClass="scale-50"
                    enable={settings.quickSetting.minimizeUI}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        quickSetting: { ...settings.quickSetting, minimizeUI: !settings.quickSetting.minimizeUI },
                      })
                    }
                  />
                </div>

                <div className="flexcenter w-full gap-6">
                  <p className="font-semibold">Position</p>
                  <SelectInput
                    list={[
                      { _id: 'home', data: 'home' },
                      { _id: 'bubble', data: 'bubble' },
                    ]}
                    defaultSelected={settings.quickSetting.position}
                    setWhenSelected={(value: QuickSettingPositionType) =>
                      setSettings({ ...settings, quickSetting: { ...settings.quickSetting, position: value } })
                    }
                  />
                </div>
              </div>
            ),
          },
          { _id: 'app_settings', Component: <SettingInfo /> },
          { _id: 'plan_purchase', Component: <PlanPurchase /> },
        ]}
      />
    </div>
  );
};
