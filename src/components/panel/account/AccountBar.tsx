import { UserIcon } from 'components/icons';
import { useAccountPanel } from 'contexts';
import { DivProps } from 'shared';
import { FC } from 'react';

const AccountBar: FC<DivProps> = (props) => {
	const { active, setActive } = useAccountPanel();

	return (
		<div {...props} onClick={() => setActive && setActive(!active)}>
			<UserIcon className='text-ctbg cursor-pointer' width='40' height='40' />
			<div className='font-bold ml-6 line-clamp-1'>Account</div>
		</div>
	);
};

export default AccountBar;
