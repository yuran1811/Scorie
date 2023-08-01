import { BookIcon } from '@cpns/icons';
import { useTour } from '@reactour/tour';

export const TourGuide = () => {
  // const { isRun } = useTourStore((s) => s.status);

  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <>
      <BookIcon
        className="mx-6 my-4 aspect-square w-12 cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          setCurrentStep(0);
        }}
      />
    </>
  );
};
