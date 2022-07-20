import SettingBar from './SettingBar';
import SettingPanel from './SettingPanel';

const SettingContainer = () => (
  <div className="flexcenter w-full p-2 m-4">
    <SettingBar className="cursor-pointer flexcenter w-full p-2 m-4" />
    <SettingPanel />
  </div>
);

export default SettingContainer;
