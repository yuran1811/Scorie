import { FC, PropsWithChildren } from 'react';

export const DocItemContent: FC<PropsWithChildren> = ({ children }) => (
  <div
    className="mb-16 w-full cursor-default rounded-[1.3rem] border-b-2 border-r-2 border-ctcolor bg-indigo-950 px-6 py-4 lgmb:w-[calc(100%-2.4rem)]"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <ul className="typo-3sm list-inside list-disc">{children}</ul>
  </div>
);
