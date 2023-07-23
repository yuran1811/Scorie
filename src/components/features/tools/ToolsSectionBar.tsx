import { scrollToTop } from '@/utils';
import { BackIcon, ToolIcon } from '@cpns/icons';
import { useNavigate } from 'react-router-dom';
import { Title } from '../main/sections/Title';
import { ToolCard } from './ToolCard';

export const ToolsSectionBar = () => {
  const navigate = useNavigate();

  return (
    <div className="my-[2rem] mb-[7rem] w-full">
      <div className="flexcenter w-full flex-wrap gap-4 px-4">
        <BackIcon className="scale-75 text-white" onClick={() => (navigate('/'), scrollToTop())} />
        <Title Icon={ToolIcon} content="Tools" />
      </div>

      <div className="mx-auto mt-4 w-full max-w-[100rem] rounded-[2rem] p-4">
        <div className="flex w-full flex-wrap items-start justify-center">
          <ToolCard data={{ id: 1, name: 'Quizie (Coming Soon)' }} />
        </div>
      </div>
    </div>
  );
};

export default ToolsSectionBar;
