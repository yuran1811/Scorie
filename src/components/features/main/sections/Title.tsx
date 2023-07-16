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
    <div className="flexcenter w-max overflow-x-hidden rounded-[1.2rem] bg-violet-900 px-[1.2rem] py-[0.5rem] text-ctcolor medtab:max-w-sm">
      <Icon className="min-w-[3.5rem]" width="24" height="24" />
      <span className="typo-sm ml-[1rem] line-clamp-1 text-left font-bold">{t(content.toLowerCase())}</span>
    </div>
  );
};
