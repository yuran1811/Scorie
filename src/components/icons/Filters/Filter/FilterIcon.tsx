import { FC, SVGProps } from 'react';
import { NotUseFilterIcon } from './NotUseFilter';
import { UseFilterIcon } from './UseFilterIcon';

interface FilterIconProps {
  isUsed: boolean;
}

export const FilterIcon: FC<FilterIconProps & SVGProps<SVGSVGElement>> = ({
  fill,
  isUsed,
  ...props
}) => (
  <>
    {isUsed ? (
      <UseFilterIcon fill={fill} {...props} />
    ) : (
      <NotUseFilterIcon fill={fill} {...props} />
    )}
  </>
);
