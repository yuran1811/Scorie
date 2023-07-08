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
    <div className="flex w-full items-center justify-center overflow-x-hidden rounded-[1.8rem] bg-indigo-400 px-[2rem] py-[0.5rem] medtab:max-w-[24rem]">
      <Icon className="min-w-[3.5rem] text-white" width="35" height="30" />
      <span className="typo-med ml-[1rem] line-clamp-1 text-left font-bold">{t(content.toLowerCase())}</span>
    </div>
  );
};
