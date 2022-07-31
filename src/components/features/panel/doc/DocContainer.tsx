import DocBar from './DocBar';
import DocPanel from './DocPanel';

const DocContainer = () => (
  <div className="flexcenter w-full">
    <DocBar className="flexcenter w-full cursor-pointer" />
    <DocPanel />
  </div>
);

export default DocContainer;
