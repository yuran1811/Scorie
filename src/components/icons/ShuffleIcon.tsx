import { FC, SVGProps } from 'react';

export const ShuffleIcon: FC<SVGProps<SVGSVGElement>> = ({ fill, ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <path
      d="M32,72H55.1a64,64,0,0,1,52,26.8l41.8,58.4a64,64,0,0,0,52,26.8H232"
      fill="none"
      stroke={fill || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    />
    <polyline
      points="208 48 232 72 208 96"
      fill="none"
      stroke={fill || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    />
    <polyline
      points="208 160 232 184 208 208"
      fill="none"
      stroke={fill || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    />
    <path
      d="M147.7,100.5l1.2-1.7a64,64,0,0,1,52-26.8H232"
      fill="none"
      stroke={fill || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    />
    <path
      d="M32,184H55.1a64,64,0,0,0,52-26.8l1.2-1.7"
      fill="none"
      stroke={fill || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    />
  </svg>
);
