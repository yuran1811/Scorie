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
        } mb-8 flex w-full items-center justify-start rounded-[2rem] bg-ctbg p-6 text-[3.5rem] text-white`}
      >
        {!active ? <ArrowRightIcon {...ArrowIconConfig} /> : <ArrowDownIcon {...ArrowIconConfig} />}
        <span className="w-full font-semibold line-clamp-1">{t(docItem.title.toLowerCase())}</span>
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
