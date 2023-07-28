import { FC, PropsWithChildren } from 'react';

export const DocItemContent: FC<PropsWithChildren> = ({ children }) => (
  <div
    className="mb-10 w-full cursor-default -mt-6 rounded-b-[1.6rem] border-b-2 border-x-2 border-violet-400 bg-indigo-950 px-6 py-4"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <ul className="typo-3sm list-inside list-disc">{children}</ul>
  </div>
);
