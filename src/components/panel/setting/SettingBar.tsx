import { SettingIcon } from 'components/icons';
import { useSetting } from 'contexts';
import { DivProps } from 'shared';
import { FC } from 'react';

const SettingBar: FC<DivProps> = (props) => {
	const { active, setActive } = useSetting();

	return (
		<div {...props} onClick={() => setActive && setActive(!active)}>
			<SettingIcon className='text-ctbg cursor-pointer' width='40' height='40' />
			<div className='font-bold ml-6 line-clamp-1'>Settings</div>
		</div>
	);
};

export default SettingBar;
