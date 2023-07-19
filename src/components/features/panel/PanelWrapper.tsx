import { usePanel } from '@/contexts';
import { classnames } from '@/utils';
import { BackIcon } from '@cpns/icons';
import { FC, PropsWithChildren, memo } from 'react';

interface PanelWrapperProps {
  type: string;
  inactiveClass: string;
  activeClass: string;
}

export const PanelWrapper: FC<PanelWrapperProps & PropsWithChildren> = memo(
  ({ type, inactiveClass, activeClass, children }) => {
    const { active, setActive } = usePanel();

    return (
      <div
        className={classnames(
          'isAnimated fullscreen',
          'relative z-20 max-w-full px-6 pb-8 pt-16',
          'bg-ctbg text-ctcolor',
          active[type] ? activeClass : inactiveClass
        )}
      >
        <BackIcon
          className="!absolute left-0 right-0 top-0 scale-75"
          onClick={() => setActive && setActive((s) => ({ ...s, [type]: false }))}
        />
        {children}
      </div>
    );
  }
);
