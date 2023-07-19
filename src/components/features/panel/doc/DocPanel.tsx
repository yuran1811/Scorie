import { PanelWrapper } from '../PanelWrapper';
import { DocInfo } from './DocInfo';

const DocPanel = () => {
  return (
    <PanelWrapper type="isDoc" activeClass="translate-x-0" inactiveClass="translate-x-[-200%]">
      <DocInfo />
    </PanelWrapper>
  );
};

export default DocPanel;
