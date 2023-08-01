import { useStore } from '@/store';
import { classnames, tabListStickyClass } from '@/utils';
import { TabUI } from '@cpns/shared';
import { FC } from 'react';

interface QuickSettingTabUIProps {
  tabListClass?: string;
  tabIcon?: any[];
  tabList: any[];
  panelList: any[];
}

export const QuickSettingTabUI: FC<QuickSettingTabUIProps> = ({ tabListClass = '', tabIcon, tabList, panelList }) => {
  const {
    glassmorphismDesign,
    quickSetting: { minimizeUI },
  } = useStore((s) => s.settings);

  return (
    <TabUI
      minimal={minimizeUI}
      tabIcon={tabIcon}
      tabListClass={classnames(
        tabListClass,
        tabListStickyClass,
        glassmorphismDesign ? '!w-max bg-white/10 backdrop-blur-sm rounded-[2rem] py-4 mx-auto' : 'bg-ctbgdark',
      )}
      tabList={tabList}
      panelList={panelList}
    />
  );
};
