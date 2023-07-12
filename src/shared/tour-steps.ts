import { mainSteps } from '@cpns/features/main/FeatureSection';
import { quoteSteps } from '@cpns/features/quotes/BlockQuote';
import { StepType } from '@reactour/tour';

export const TOUR_STEPS: StepType[] = [...mainSteps, ...quoteSteps];

export const getDirOfStep = (step: number, callback: any) => {
  if (mainSteps.length <= step && step < quoteSteps.length + mainSteps.length) {
    callback('/');
  }

  callback('/');
};
