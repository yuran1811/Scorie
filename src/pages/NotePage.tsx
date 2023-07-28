import { withSignIn } from '@/hocs';
import NoteSectionBar from '@cpns/features/notes/NoteSectionBar';
import { FC } from 'react';

export const NotePage: FC = () => {
  return <NoteSectionBar />;
};

export default withSignIn(NotePage);
