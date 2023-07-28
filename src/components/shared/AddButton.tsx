import { DivProps } from '@/shared';
import { PlusIcon } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { LazyMotion, domMax, m } from 'framer-motion';
import { FC } from 'react';

export const AddButton: FC<DivProps> = ({ onClick }) => (
  <LazyMotion features={domMax} strict>
    <m.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 50, bottom: 70 }}
      dragElastic={1}
      className="flexcenter fixed bottom-[7rem] right-[5rem] z-10 h-[7rem] w-[7rem] scale-90 cursor-pointer rounded-full border-[0.5rem] border-indigo-200/80 bg-ctbg/60 opacity-30 hover:opacity-100 active:opacity-100 medmb:scale-105 lgmb:opacity-100 medtab:bottom-[10rem] medtab:scale-110 lgdesk:bottom-[7rem] lgdesk:right-[10rem]"
      onClick={onClick}
    >
      <Tooltip content="Add new score" options={{ delay: 400 }}>
        <PlusIcon
          className="relative right-[-0.8rem] top-[-1.5rem] z-[1] cursor-pointer text-white"
          width="55"
          height="55"
        />
      </Tooltip>
    </m.div>
  </LazyMotion>
);
