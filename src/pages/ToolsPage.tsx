import { withSignIn } from '@/hocs';
import ToolsSectionBar from '@cpns/features/tools/ToolsSectionBar';
import { FC } from 'react';

export const ToolsPage: FC = () => {
  return <ToolsSectionBar />;
};

export default withSignIn(ToolsPage);
