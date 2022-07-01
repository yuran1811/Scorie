import { BackIcon } from 'components/icons';
import { SettingInfo } from './SettingInfo';
import { useMenu, useSetting } from 'contexts';
import { FC, HTMLProps, useEffect } from 'react';

const SettingPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active: menuActive } = useMenu();
	const { active, setActive } = useSetting();

	useEffect(() => {
		setActive && setActive(false);
	}, [menuActive]);

	return (
		<div
			className={`${className || ''} ${
				active ? 'translate-y-0' : 'translate-y-[200%]'
			} z-20 isAnimated fullscreen px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			<SettingInfo />
		</div>
	);
};

export default SettingPanel;
