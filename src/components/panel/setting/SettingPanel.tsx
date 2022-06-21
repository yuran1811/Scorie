import { BackIcon } from 'components/icons';
import { useSetting } from 'contexts';
import { FC, HTMLProps } from 'react';
import { SettingInfo } from './SettingInfo';

const SettingPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active, setActive } = useSetting();

	return (
		<div
			className={`${className} ${
				active ? 'translate-y-0' : 'translate-y-[200%]'
			} z-20 transition-all duration-300 fixed top-0 left-0 px-12 py-20 w-[100vw] h-[100vh] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			<SettingInfo />
		</div>
	);
};

export default SettingPanel;
