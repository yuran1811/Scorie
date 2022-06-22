import { UserIcon } from 'components/icons';
import { useAccount } from 'contexts';
import { FC, HTMLProps } from 'react';

const AccountBar: FC<HTMLProps<HTMLDivElement>> = (props) => {
	const { active, setActive } = useAccount();

	return (
		<div {...props} onClick={() => setActive && setActive(!active)}>
			<UserIcon className='text-ctbg cursor-pointer' width='40' height='40' />
			<div className='font-bold ml-6 line-clamp-1'>Account</div>
		</div>
	);
};

export default AccountBar;
