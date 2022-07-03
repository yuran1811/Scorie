import { useMenu } from 'contexts';
import { FC, useCallback } from 'react';
import { DivProps } from 'shared';

const beforeStyle = (active: boolean) =>
	`before:transition-all before:content-[""] before:absolute before:w-full before:h-[0.5rem] before:top-[1.2rem] before:left-0 ${
		active ? 'before:rotate-[135deg] before:top-[2rem] before:bg-ctbg' : 'before:bg-white'
	}`;
const afterStyle = (active: boolean) =>
	`after:transition-all after:bg-ctbg after:content-[""] after:absolute after:w-full after:h-[0.5rem] after:bottom-[1.2rem] after:left-0 ${
		active ? 'after:rotate-[-135deg] after:top-[2rem]' : 'after:bg-white'
	}`;

interface MenuIconProps {}

export const MenuIcon: FC<MenuIconProps & DivProps> = (props) => {
	const { className, ...otherProps } = props;

	const { active, setActive } = useMenu();

	const onClickHandle = useCallback(() => {
		setActive && setActive((active) => !active);
	}, []);

	return (
		<div
			{...otherProps}
			className={`${
				className || ''
			} cursor-pointer flexcenter min-w-[4rem] min-h-[4rem] w-[4rem] h-[4rem] transition-all flexcentercol relative ${beforeStyle(
				active
			)} ${afterStyle(active)}`}
			onClick={onClickHandle}
		/>
	);
};
