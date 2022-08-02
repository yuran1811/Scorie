import { DivProps } from '@/shared';
import { PlusIcon } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { motion } from 'framer-motion';
import { FC } from 'react';

export const AddButton: FC<DivProps> = ({ onClick }) => (
  <motion.div
    drag
    dragConstraints={{ top: 0, left: 0, right: 50, bottom: 70 }}
    dragElastic={1}
    className="flexcenter fixed right-[5rem] bottom-[7rem] z-10 h-[7rem] w-[7rem] cursor-pointer rounded-full border-[0.5rem] border-indigo-200 bg-ctbg opacity-30 hover:opacity-100 active:opacity-100 mobile:opacity-100 tablet:bottom-[10rem] desktop:right-[10rem] desktop:bottom-[7rem]"
    onClick={onClick}
  >
    <Tooltip content="Add new score" options={{ delay: 400 }}>
      <PlusIcon
        className="relative top-[-1.5rem] right-[-0.8rem] z-[1] cursor-pointer text-white"
        width="55"
        height="55"
      />
    </Tooltip>
  </motion.div>
);
