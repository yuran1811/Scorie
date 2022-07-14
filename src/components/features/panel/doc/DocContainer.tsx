import DocBar from './DocBar';
import DocPanel from './DocPanel';

const DocContainer = () => (
	<div className='flexcenter w-full p-2 m-4'>
		<DocBar className='cursor-pointer flexcenter w-full p-2 m-4' />
		<DocPanel />
	</div>
);

export default DocContainer;
