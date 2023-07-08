import { StepType } from '@reactour/tour';
import __ from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TourStatusType {
  isRun: boolean;
}

interface StoreType {
  status: TourStatusType;
  setStatus: (status: TourStatusType) => void;

  steps: StepType[];
  setSteps: (steps: StepType[]) => void;

  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

export const TOUR_STORE_NAME = __.kebabCase('Tour Store');
export const TOUR_STORE_VERSION = 0.01;

export const useTourStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        steps: [],
        setSteps: (steps) => set({ steps }),

        currentStep: 0,
        setCurrentStep: (currentStep) => set({ currentStep }),

        status: { isRun: false },
        setStatus: (status) => set({ status }),
      }),
      {
        name: TOUR_STORE_NAME,
        version: TOUR_STORE_VERSION,
      }
    )
  )
);
