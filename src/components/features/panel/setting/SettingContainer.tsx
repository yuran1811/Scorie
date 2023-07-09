import SettingBar from './SettingBar';
import SettingPanel from './SettingPanel';

const SettingContainer = () => (
  <div className="flexcenter w-full">
    <SettingBar className="flexcenter w-full cursor-pointer gap-8" />
    <SettingPanel />
  </div>
);

export default SettingContainer;
