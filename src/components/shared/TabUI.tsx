import { classnames } from '@/utils';
import { Tab } from '@headlessui/react';
import { FC } from 'react';

interface TabProps {
  tabList: any[];
  tabListClass: { general: string; normal: string; selected: string };
  panelList: {
    _id: string;
    Component: any;
  }[];
}

export const TabUI: FC<TabProps> = ({ tabList, tabListClass, panelList }) => {
  return (
    <Tab.Group>
      <Tab.List className="flexcenter gap-8 p-4">
        {tabList.map((_) => (
          <Tab
            key={_}
            className={({ selected }) =>
              classnames(tabListClass.general, selected ? tabListClass.selected : tabListClass.normal)
            }
          >
            {_}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {panelList.map(({ _id, Component }) => (
          <Tab.Panel key={_id} className={classnames('rounded-xl')}>
            <Component />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
