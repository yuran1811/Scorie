import { useTourStore } from '@/store';
import { BookIcon } from '@cpns/icons';
import { useTour } from '@reactour/tour';
import React from 'react';

export const TourGuide = () => {
  const { isRun } = useTourStore((s) => s.status);

  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <>
      <BookIcon
        className="my-4 mx-6 cursor-pointer"
        width="40"
        height="40"
        onClick={() => {
          setIsOpen(true);
          setCurrentStep(0);
        }}
      />
    </>
  );
};
