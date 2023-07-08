import { FC } from 'react';
import AccountBar from './AccountBar';
import AccountPanel from './AccountPanel';
import { DivProps } from '@shared/types';

const AccountContainer: FC<DivProps> = ({ className }) => (
  <div className="flexcenter w-full">
    <AccountBar className={`flexcenter w-full cursor-pointer ${className}`} />
    <AccountPanel className={className} />
  </div>
);

export default AccountContainer;
