export * from './Clock';

export * from './DarkDimStyle';
export * from './DoubleStyle';
export * from './HorizontalStyle';
export * from './RectStyle';
export * from './VerticalStyle';

import { ClockStyleType } from '@/shared';
import { DarkDimClockStyle, DoubleClockStyle, HorizontalClockStyle, RectClockStyle, VerticalClockStyle } from '.';

export const ClockStyles: { type: ClockStyleType; name: string; Component: any }[] = [
  { type: 'darkdim', name: 'Dark Dim', Component: DarkDimClockStyle },
  { type: 'double', name: 'Double', Component: DoubleClockStyle },
  { type: 'horizontal', name: 'Horizontal', Component: HorizontalClockStyle },
  { type: 'rect', name: 'Rect', Component: RectClockStyle },
  { type: 'vertical', name: 'Vertical', Component: VerticalClockStyle },
];
