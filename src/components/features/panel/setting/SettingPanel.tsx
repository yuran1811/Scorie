import { PanelWrapper } from '../PanelWrapper';
import { SettingInfo } from './SettingInfo';

const SettingPanel = () => {
  return (
    <PanelWrapper type="isSetting" activeClass="translate-y-0" inactiveClass="translate-y-[200%]">
      <SettingInfo />
    </PanelWrapper>
  );
};

export default SettingPanel;
