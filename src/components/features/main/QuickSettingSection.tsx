import { classnames } from '@/utils';
import { Clock, PlanPurchase } from '@cpns/shared';
import { Tab } from '@headlessui/react';

export const QuickSettingSection = () => {
  return <></>;

  return (
    <div className="container mx-auto my-28 w-full max-w-3xl border-4 p-4">
      <Tab.Group>
        <Tab.List className="flex rounded-3xl border-4 border-rose-500 p-4">
          {['Clock', 'Weather', 'Billing'].map((_) => (
            <Tab
              key={_}
              className={({ selected }) =>
                classnames('typo-2sm w-full px-4 py-2 font-bold', selected ? 'underline' : 'hover:bg-violet-500')
              }
            >
              {_}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 border-4 border-rose-500">
          <Tab.Panel className={classnames('rounded-xl')}>
            <div className="aspect-square w-[12rem]">
              <Clock />
            </div>
          </Tab.Panel>
          <Tab.Panel className={classnames('rounded-xl')}>
            <PlanPurchase />
          </Tab.Panel>
          <Tab.Panel className={classnames('rounded-xl')}>
            <PlanPurchase />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
