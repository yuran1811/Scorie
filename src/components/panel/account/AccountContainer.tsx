import { AccountProvider } from 'contexts';
import AccountBar from './AccountBar';
import AccountPanel from './AccountPanel';

const AccountContainer = () => (
	<AccountProvider>
		<div className='flexcenter w-full p-2 m-4'>
			<AccountBar className='cursor-pointer flexcenter w-full p-2 m-4' />
			<AccountPanel />
		</div>
	</AccountProvider>
);

export default AccountContainer;
