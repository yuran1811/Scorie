import { ButtonProps } from '@/shared';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { FC } from 'react';

export const PrevQuoteButton: FC<ButtonProps> = ({ disabled, onClick }) => (
  <Tooltip content="Previous quote">
    <button disabled={disabled} className="flexcenter group right-[10rem]" onClick={onClick}>
      <ArrowLeftIcon
        className={`isAnimated ${disabled ? 'text-gray-500/60' : 'group-hover:translate-x-[-0.6rem]'}`}
        width="35"
        height="35"
      />
    </button>
  </Tooltip>
);

export const NextQuoteButton: FC<ButtonProps> = ({ disabled, onClick }) => (
  <Tooltip content="Next quote">
    <button disabled={disabled} className="flexcenter group right-[5rem]" onClick={onClick}>
      <ArrowRightIcon
        className={`isAnimated ${disabled ? 'text-gray-500/60' : 'group-hover:translate-x-[0.6rem]'}`}
        width="35"
        height="35"
      />
    </button>
  </Tooltip>
);

export const FetchQuoteButton: FC<ButtonProps> = ({ onClick }) => (
  <Tooltip content="Get new quotes">
    <button className="flexcenter right-[5rem]" onClick={onClick}>
      <AddIcon width="35" height="35" />
    </button>
  </Tooltip>
);
