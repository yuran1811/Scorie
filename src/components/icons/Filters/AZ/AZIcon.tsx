import { FC, SVGProps } from 'react';
import { AZDownIcon } from './AZDown';
import { AZUpIcon } from './AZUp';

interface AZIconProps {
  dirMode: string;
}

export const AZIcon: FC<AZIconProps & SVGProps<SVGSVGElement>> = ({ fill, dirMode, ...props }) => (
  <>
    {dirMode === 'desc' ? (
      <AZDownIcon fill={fill} {...props} />
    ) : (
      <AZUpIcon fill={fill} {...props} />
    )}
  </>
);
