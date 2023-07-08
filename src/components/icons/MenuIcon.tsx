import { usePanel } from '@/contexts';
import { DivProps } from '@/shared';
import { FC } from 'react';

const beforeStyle = (active: boolean) =>
  `before:transition-all before:content-[""] before:bg-white before:absolute before:w-full before:h-[0.5rem] before:top-[1.2rem] before:left-0 ${
    active ? 'before:rotate-[135deg] before:top-[2rem]' : 'before:bg-white'
  }`;
const afterStyle = (active: boolean) =>
  `after:transition-all after:content-[""] after:bg-white after:absolute after:w-full after:h-[0.5rem] after:bottom-[1.2rem] after:left-0 ${
    active ? 'after:rotate-[-135deg] after:top-[2rem]' : 'after:bg-white'
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
      className={`flexcenter flexcentercol relative h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] cursor-pointer transition-all ${
        beforeStyle(active.isMenu) + ' ' + afterStyle(active.isMenu)
      } ${className}`}
      onClick={onClickHandle}
    />
  );
};
