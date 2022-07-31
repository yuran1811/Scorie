import DataBar from './DataBar';
import DataPanel from './DataPanel';

const DataContainer = () => (
  <div className="flexcenter w-full">
    <DataBar className="flexcenter w-full cursor-pointer" />
    <DataPanel />
  </div>
);

export default DataContainer;
