import { FC, PropsWithChildren } from 'react';

export const DocItemContent: FC<PropsWithChildren> = ({ children }) => (
  <div
    className="left-0 top-[7rem] mb-16 w-full cursor-default rounded-[2rem] border-[0.5rem] border-ctbg p-6 lgmb:w-[calc(100%-3rem)]"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <ul className="list-inside list-disc text-[2.5rem]">{children}</ul>
  </div>
);
