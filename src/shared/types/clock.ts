export type ClockStyleType = 'horizontal' | 'vertical' | 'rect' | 'double' | 'darkdim';

export interface ClockProps {
  type?: ClockStyleType;
}

export interface ClockStoreType {
  type: ClockStyleType;
}
