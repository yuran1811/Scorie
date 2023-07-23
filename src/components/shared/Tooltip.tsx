import { DivProps } from '@/shared';
import Tippy, { TippyProps } from '@tippyjs/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  content?: string;
  options?: TippyProps;
  childrenClass?: string;
}

export const Tooltip: FC<TooltipProps & DivProps> = ({ className = '', childrenClass = '', children, content, options }) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Tippy {...options} content={t(content?.toLowerCase() || 'tooltip')}>
        <div className={childrenClass}>{children}</div>
      </Tippy>
    </div>
  );
};
