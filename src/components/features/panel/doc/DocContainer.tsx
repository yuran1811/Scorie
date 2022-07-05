import { DocPanelProvider } from 'contexts';
import DocPanel from './DocPanel';
import DocBar from './DocBar';

const DocContainer = () => (
	<DocPanelProvider>
		<div className='flexcenter w-full p-2 m-4'>
			<DocBar className='cursor-pointer flexcenter w-full p-2 m-4' />
			<DocPanel />
		</div>
	</DocPanelProvider>
);

export default DocContainer;
