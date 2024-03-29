import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { classnames } from '@/utils';
import { FC } from 'react';

const beforeStyle = (active: boolean) =>
  `before:transition-all before:content-[""] before:absolute before:bg-ctcolor before:w-full before:h-[0.5rem] before:top-[1.2rem] before:rounded-md before:left-0 ${
    active ? 'before:rotate-[135deg] before:top-[2rem]' : 'before:!bg-white'
  }`;
const afterStyle = (active: boolean) =>
  `after:transition-all after:content-[""] after:absolute after:bg-ctcolor after:w-full after:h-[0.5rem] after:bottom-[1.2rem] after:left-0 after:rounded-md ${
    active ? 'after:rotate-[-135deg] after:top-[2rem]' : 'after:!bg-white'
  }`;

interface MenuIconProps {}

export const MenuIcon: FC<MenuIconProps & DivProps> = ({ className, ...otherProps }) => {
  const { active, setActive } = usePanel();

  const onClickHandle = () => {
    setActive && setActive((s) => ({ ...s, isMenu: !s.isMenu }));
  };

  return (
    <div
      {...otherProps}
      className={classnames(
        'flexcentercol relative h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] cursor-pointer transition-all',
        beforeStyle(active.isMenu),
        afterStyle(active.isMenu),
        className
      )}
      onClick={onClickHandle}
    />
  );
};
