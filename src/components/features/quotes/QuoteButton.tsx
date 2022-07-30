import { ButtonProps } from '@/shared';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { FC } from 'react';

export const PrevQuoteButton: FC<ButtonProps> = ({ onClick }) => (
  <Tooltip content="Previous quote">
    <button className="group right-[10rem]" onClick={onClick}>
      <ArrowLeftIcon
        className="isAnimated group-hover:translate-x-[-0.6rem]"
        width="40"
        height="40"
      />
    </button>
  </Tooltip>
);

export const NextQuoteButton: FC<ButtonProps> = ({ onClick }) => (
  <Tooltip content="Next quote">
    <button className="group right-[5rem]" onClick={onClick}>
      <ArrowRightIcon
        className="isAnimated group-hover:translate-x-[0.6rem]"
        width="40"
        height="40"
      />
    </button>
  </Tooltip>
);

export const FetchQuoteButton: FC<ButtonProps> = ({ onClick }) => (
  <Tooltip content="Get new quotes">
    <button className="group right-[5rem]" onClick={onClick}>
      <AddIcon className="isAnimated group-hover:translate-x-[0.6rem]" width="40" height="40" />
    </button>
  </Tooltip>
);
