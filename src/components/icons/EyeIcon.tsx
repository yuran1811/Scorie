import { motion, SVGMotionProps } from 'framer-motion';
import { FC } from 'react';

interface EyeIconProps {
  reveal?: boolean;
}

const template = ({ rotateX }: { rotateX: string }) => `rotateX(${rotateX})`;

export const EyeIcon: FC<EyeIconProps & SVGMotionProps<SVGSVGElement>> = ({
  reveal = false,
  fill,
  ...props
}) => (
  <motion.svg {...props} viewBox="0 0 72 72">
    <path
      fill="none"
      stroke="#575cba"
      strokeLinecap="round"
      strokeWidth="4.5"
      d="M 15.6,37 C 15.6,37 24.309181,49.073101 34.102911,49.166773 43.896641,49.260445 53.4,37 53.4,37"
    />
    <circle
      cx="34.400002"
      cy="36"
      r="6"
      fill="#575cba"
      strokeLinecap="round"
      strokeWidth="4.65066"
    />
    <motion.path
      initial={{
        d: 'M -5,-5 V 37 H 15.6 C 15.6,37 25.327177,48.715274 34.312131,48.785 43.297085,48.854726 53.4,37 53.4,37 H 77 V -5 Z',
      }}
      animate={{
        d: reveal
          ? 'M -5,-5 V 37 H 15.6 C 15.6,37 21.35124,23.469343 34.312131,23.469343 47.273022,23.469343 53.4,37 53.4,37 H 77 V -5 Z'
          : 'M -5,-5 V 37 H 15.6 C 15.6,37 25.327177,48.715274 34.312131,48.785 43.297085,48.854726 53.4,37 53.4,37 H 77 V -5 Z',
      }}
      transition={{
        default: { duration: 0.3, ease: 'easeInOut' },
      }}
      clipPath="polygon(17px 53px, 61px 52px, 57px 14px, 25px 14px)"
      fill="#fff"
      stroke="#575cba"
      strokeLinecap="butt"
      strokeWidth="4.5"
    />
    <g
      className="origin-[50%] transition-transform duration-300 ease-in-out"
      style={{
        transform: reveal ? 'rotateX(0)' : 'rotateX(180deg)',
      }}
    >
      <path
        fill="none"
        stroke="#575cba"
        strokeLinecap="butt"
        strokeWidth="4.5"
        d="M 17.45627,17.07484 24.778981,25.652873"
      />
      <path
        fill="none"
        stroke="#575cba"
        strokeLinecap="butt"
        strokeWidth="4.5"
        d="M 34.602,12.600574 V 23.601076"
      />
      <path
        fill="none"
        stroke="#575cba"
        strokeLinecap="butt"
        strokeWidth="4.5"
        d="M 51.580203,17.07484 44.257492,25.652873"
      />
    </g>
  </motion.svg>
);
