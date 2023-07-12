import { DivProps } from '@/shared';
import { FC, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

interface TitleProps {
  content: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export const Title: FC<TitleProps & DivProps> = ({ Icon, content }) => {
  const { t } = useTranslation();

  return (
    <div className="flexcenter w-max overflow-x-hidden rounded-[1.8rem] bg-violet-900 px-[2rem] py-[0.5rem] text-ctcolor medtab:max-w-sm">
      <Icon className="min-w-[3.5rem]" width="30" height="30" />
      <span className="typo ml-[1rem] line-clamp-1 text-left font-bold">{t(content.toLowerCase())}</span>
    </div>
  );
};
