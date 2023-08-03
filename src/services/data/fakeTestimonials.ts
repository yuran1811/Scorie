import { TestimonialProps } from '@/shared';

export const getFakeTestimonials = (size?: number) => {
  const arrayLength = size || 10;
  return Array(arrayLength)
    .fill(0)
    .map(
      (_, idx) =>
        ({
          id: `testi-${idx}`,
          name: `Testi No.${idx}`,
          job: 'Testi',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reiciendis at laudantium minima fugiat labore quis expedita doloribus animi quos.',
          votes: [],
        }) as TestimonialProps,
    );
};
