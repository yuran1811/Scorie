import { AccountPanelProvider } from 'contexts';
import AccountPanel from './AccountPanel';
import AccountBar from './AccountBar';

const AccountContainer = () => (
	<AccountPanelProvider>
		<div className='flexcenter w-full p-2 m-4'>
			<AccountBar className='cursor-pointer flexcenter w-full p-2 m-4' />
			<AccountPanel />
		</div>
	</AccountPanelProvider>
);

export default AccountContainer;
