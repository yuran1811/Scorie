import Tippy, { TippyProps } from '@tippyjs/react';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  content?: string;
  options?: TippyProps;
}

export const Tooltip: FC<TooltipProps & PropsWithChildren> = ({ children, content, options }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Tippy {...options} content={t(content?.toLowerCase() || 'tooltip')}>
        <div>{children}</div>
      </Tippy>
    </div>
  );
};
