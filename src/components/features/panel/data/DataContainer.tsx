import DataBar from './DataBar';
import DataPanel from './DataPanel';

const DataContainer = () => (
	<div className='flexcenter w-full p-2 m-4'>
		<DataBar className='cursor-pointer flexcenter w-full p-2 m-4' />
		<DataPanel />
	</div>
);

export default DataContainer;
