import { BackIcon } from 'components/icons';
import { useMenu, useSetting } from 'contexts';
import { FC, HTMLProps, useEffect } from 'react';
import { SettingInfo } from './SettingInfo';

const SettingPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active, setActive } = useSetting();

	const { active: menuActive } = useMenu();

	useEffect(() => {
		setActive && setActive(false);
	}, [menuActive]);

	return (
		<div
			className={`${className} ${
				active ? 'translate-y-0' : 'translate-y-[200%]'
			} z-20 transition-all duration-300 fixed top-0 left-0 px-12 py-20 max-w-[40rem] w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			<SettingInfo />
		</div>
	);
};

export default SettingPanel;
