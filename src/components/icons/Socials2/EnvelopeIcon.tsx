import { SVGProps } from 'react';

export function EnvelopeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8ZM98.7 128L40 181.8V74.2Zm11.8 10.9l12.1 11a8 8 0 0 0 10.8 0l12.1-11l57.9 53.1H52.6Zm46.8-10.9L216 74.2v107.6Z"
      />
    </svg>
  );
}
