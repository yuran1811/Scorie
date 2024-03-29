import AccountBar from './AccountBar';
import AccountPanel from './AccountPanel';

const AccountContainer = () => (
  <div className="flexcenter w-full">
    <AccountBar className="flexcenter w-full cursor-pointer gap-8" />
    <AccountPanel />
  </div>
);

export default AccountContainer;
