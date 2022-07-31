import { FC } from 'react';

export const DocItemContent: FC = ({ children }) => (
  <div
    className="top-[7rem] left-0 mb-16 w-full cursor-default rounded-[2rem] border-[0.5rem] border-ctbg p-6 mobile:w-[calc(100%-3rem)]"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <ul className="list-inside list-disc text-[2.5rem]">{children}</ul>
  </div>
);
