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
    <div className="flex w-full items-center justify-center overflow-x-hidden rounded-[1.8rem] bg-indigo-400 px-[2rem] py-[0.5rem] tablet:max-w-[24rem]">
      <Icon className="min-w-[3.5rem] text-white" width="35" height="30" />
      <span className="ml-[1rem] text-left text-[3.5rem] font-bold line-clamp-1">
        {t(content.toLowerCase())}
      </span>
    </div>
  );
};
