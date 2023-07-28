export type ClockStyleType = 'horizontal' | 'vertical' | 'rect' | 'double' | 'darkdim';

export interface ClockProps {
  type?: ClockStyleType;
}

export interface ClockStoreType {
  type: ClockStyleType;
}

export interface TimerType {
  length: number;
  current: number;
}

export interface TimerStoreType {
  _id: string;
  data: TimerType;
}
