import { DocDataType } from '@/shared';
import { DocItemContent } from './DocItemContent';
import { ArrowDownIcon, ArrowRightIcon } from '@cpns/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DocItemProps {
  data: DocDataType;
}

const ArrowIconConfig = {
  className: 'mx-4',
  width: '50',
  height: '50',
  fill: '#a5b4fc',
};

export const DocItem: FC<DocItemProps> = ({ data: docItem }) => {
  const [active, setActive] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="flexcentercol" onClick={() => setActive((a) => !a)}>
      <div
        className={`${
          active ? 'sticky top-0 left-0' : ''
        } flex items-center justify-start w-full p-6 mb-8 rounded-[2rem] text-[3.5rem] text-white bg-ctbg`}
      >
        {!active ? <ArrowRightIcon {...ArrowIconConfig} /> : <ArrowDownIcon {...ArrowIconConfig} />}
        <span className="font-semibold w-full line-clamp-1">{t(docItem.title.toLowerCase())}</span>
      </div>

      {active && (
        <DocItemContent>
          {docItem.data.map((item, idx) => (
            <li key={idx} className="">
              {item}
            </li>
          ))}
        </DocItemContent>
      )}
    </div>
  );
};
