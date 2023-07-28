import { DocDataType } from '@/shared';
import { classnames } from '@/utils';
import { ArrowDownIcon, ArrowRightIcon } from '@cpns/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DocItemContent } from './DocItemContent';

interface DocItemProps {
  data: DocDataType;
}

const ArrowIconConfig = {
  className: 'mx-4',
  width: '24',
  height: '24',
  fill: '#a5b4fc',
};

export const DocItem: FC<DocItemProps> = ({ data: docItem }) => {
  const [active, setActive] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="flexcentercol" onClick={() => setActive((a) => !a)}>
      <div
        className={classnames(
          'typo-sm mb-6 flex w-full items-center justify-start rounded-[1.6rem] border-x-2 border-t-2 border-violet-400 bg-indigo-950 p-4 text-white',
          active ? 'sticky left-0 top-0 rounded-b-none' : '',
        )}
      >
        {!active ? <ArrowRightIcon {...ArrowIconConfig} /> : <ArrowDownIcon {...ArrowIconConfig} />}
        <span className="line-clamp-1 w-full font-semibold">{t(docItem.title.toLowerCase())}</span>
      </div>

      {active && (
        <DocItemContent>
          {docItem.data.map((item, idx) => (
            <li key={idx} className="text-white">
              {item}
            </li>
          ))}
        </DocItemContent>
      )}
    </div>
  );
};
