import { classnames } from '@/utils';
import { Switch } from '@headlessui/react';
import { FC } from 'react';

interface SwitchBtnProps {
  containterClass?: string;
  alt?: string;
  enable: boolean;
  onChange: any;
}

export const SwitchBtn: FC<SwitchBtnProps> = ({ alt = 'setting_switch_button', containterClass = '', enable, onChange }) => {
  return (
    <Switch
      checked={enable}
      onChange={onChange}
      className={classnames(
        !enable ? 'bg-violet-900' : 'bg-violet-500',
        'relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
        containterClass
      )}
    >
      <span className="sr-only">{alt}</span>
      <span
        aria-hidden="true"
        className={classnames(
          enable ? 'translate-x-[36px]' : 'translate-x-0',
          'pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
};
