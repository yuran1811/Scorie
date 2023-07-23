import { classnames } from '@/utils';
import { WeatherPanel } from '@cpns/shared';
import { Tab } from '@headlessui/react';
import { ClockPanel } from './clock';
import { QuickSettingPanel } from './settings';

export const QuickSettingSection = () => {
  return (
    <div className="container mx-auto my-28 w-full p-4">
      <Tab.Group>
        <Tab.List className="flexcenter sticky left-0 top-[6.4rem] z-10 mx-auto w-max max-w-full flex-wrap gap-2 rounded-3xl bg-ctbgdark medmb:gap-8 medtab:max-w-[920px]">
          {['Clock', 'Weather', 'Settings'].map((_) => (
            <Tab
              key={_}
              className={({ selected }) =>
                classnames(
                  'isAnimated typo-2sm w-max rounded-3xl border-0 px-6 py-2 font-bold outline-none',
                  selected ? 'bg-violet-200 text-violet-800' : 'text-violet-300 hover:bg-violet-700'
                )
              }
            >
              {_}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classnames('rounded-xl')}>
            <ClockPanel />
          </Tab.Panel>
          <Tab.Panel className={classnames('rounded-xl')}>
            <WeatherPanel />
          </Tab.Panel>
          <Tab.Panel className={classnames('rounded-xl')}>
            <QuickSettingPanel />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
