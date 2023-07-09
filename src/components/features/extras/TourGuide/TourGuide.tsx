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
        className="mx-6 my-4 cursor-pointer"
        width="32"
        height="32"
        onClick={() => {
          setIsOpen(true);
          setCurrentStep(0);
        }}
      />
    </>
  );
};
