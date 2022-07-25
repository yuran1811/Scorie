import { EllipsisHorizontalIcon } from './EllipsisHorizontal';
import { EllipsisVerticalIcon } from './EllipsisVertical';
import { FC, SVGProps } from 'react';

interface EllipsisIconProps {
  dirMode: string;
}

export const EllipsisIcon: FC<EllipsisIconProps & SVGProps<SVGSVGElement>> = ({
  fill,
  dirMode,
  ...props
}) => (
  <>
    {dirMode === 'horizontal' ? (
      <EllipsisHorizontalIcon fill={fill} {...props} />
    ) : (
      <EllipsisVerticalIcon fill={fill} {...props} />
    )}
  </>
);
