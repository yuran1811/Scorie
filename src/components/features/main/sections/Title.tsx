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
    <div className="tablet:max-w-[24rem] w-full flex items-center justify-center bg-indigo-400 px-[2rem] py-[0.5rem] rounded-[1.8rem] overflow-x-hidden">
      <Icon className="text-white min-w-[3.5rem]" width="35" height="30" />
      <span className="font-bold text-[3.5rem] text-left ml-[1rem] line-clamp-1">
        {t(content.toLowerCase())}
      </span>
    </div>
  );
};
