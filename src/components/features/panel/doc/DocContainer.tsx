import DocBar from './DocBar';
import DocPanel from './DocPanel';

const DocContainer = () => (
  <div className="flexcenter w-full">
    <DocBar className="flexcenter w-full cursor-pointer gap-8" />
    <DocPanel />
  </div>
);

export default DocContainer;
