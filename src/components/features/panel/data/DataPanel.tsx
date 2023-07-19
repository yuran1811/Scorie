import { usePanel } from '@/contexts';
import { PanelWrapper } from '../PanelWrapper';
import { DataInfo } from './DataInfo';

const DataPanel = () => {
  const { active, setActive } = usePanel();

  return (
    <PanelWrapper type="isData" activeClass="translate-x-0" inactiveClass="translate-x-[-200%]">
      <DataInfo />
    </PanelWrapper>
  );
};

export default DataPanel;
