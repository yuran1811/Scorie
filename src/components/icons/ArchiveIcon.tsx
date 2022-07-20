import { FC, SVGProps } from 'react';

export const ArchiveIcon: FC<SVGProps<SVGSVGElement>> = ({ fill, ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill={fill || 'currentColor'}
      d="M464 32h-416C21.49 32 0 53.49 0 80v64C0 161.6 14.4 176 31.1 176L32 416c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V176c17.6 0 32-14.4 32-31.1V80C512 53.49 490.5 32 464 32zM416 432H96c-8.837 0-16-7.163-16-16V176h352V416C432 424.8 424.8 432 416 432zM464 128h-416V80h416V128zM183.1 272h144C341.3 272 352 261.3 352 248C352 234.7 341.3 224 328 224H183.1C170.7 224 160 234.7 160 247.1C160 261.3 170.7 272 183.1 272z"
    />
  </svg>
);
