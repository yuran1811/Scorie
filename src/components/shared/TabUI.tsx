import { classnames } from '@/utils';
import { Tab, TabGroupProps } from '@headlessui/react';
import { FC } from 'react';

const DEFAULT_STYLE: TabProps['tabClass'] = {
  general: 'isAnimated typo-3sm w-max rounded-3xl border-0 px-6 py-2 font-bold outline-none',
  normal: 'text-violet-300 hover:bg-violet-700',
  selected: 'bg-violet-200 text-violet-800',
};

interface TabProps {
  TabOptions?: TabGroupProps<any>;

  minimal?: boolean;

  tabClass?: { general: string; normal: string; selected: string };
  tabListClass?: string;

  tabIcon?: any[];

  tabList: string[];
  panelList: {
    _id: string;
    Component: any;
  }[];
}

export const TabUI: FC<TabProps> = ({
  TabOptions = {},
  minimal = false,
  tabClass = DEFAULT_STYLE,
  tabListClass = '',
  tabIcon = [],
  tabList,
  panelList,
}) => {
  return (
    <Tab.Group {...TabOptions}>
      <Tab.List className={classnames('flexcenter flex-wrap gap-8 p-8 medtab:p-4', tabListClass)}>
        {tabList.map((_, idx) => (
          <Tab
            key={_}
            className={({ selected }) =>
              classnames(tabClass.general, selected ? tabClass.selected : tabClass.normal, 'flexcenter gap-3')
            }
          >
            {tabIcon && tabIcon.length ? tabIcon[idx] : <></>}
            {(!minimal || !tabIcon || !tabIcon.length) && (
              <span className={classnames('medtab:inline', tabIcon && tabIcon[idx] ? 'hidden' : '')}>{_}</span>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mx-auto mt-2 h-max w-full max-w-[940px]">
        {panelList.map(({ _id, Component }) => (
          <Tab.Panel key={_id} className={classnames('rounded-xl')}>
            {Component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
