import { SettingProvider } from 'contexts';
import SettingBar from './SettingBar';
import SettingPanel from './SettingPanel';

const SettingContainer = () => (
	<SettingProvider>
		<div className='flexcenter w-full p-2 m-4'>
			<SettingBar className='cursor-pointer flexcenter w-full p-2 m-4' />
			<SettingPanel />
		</div>
	</SettingProvider>
);

export default SettingContainer;
