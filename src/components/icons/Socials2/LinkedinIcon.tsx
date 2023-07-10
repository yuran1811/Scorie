import { SVGProps } from 'react';

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="#50b0ff"
        d="M220 44v168a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8V44a8 8 0 0 1 8-8h168a8 8 0 0 1 8 8Z"
        opacity=".4"
      />
      <path
        fill="currentColor"
        d="M96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm-8-44a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm140-24v168a16 16 0 0 1-16 16H44a16 16 0 0 1-16-16V44a16 16 0 0 1 16-16h168a16 16 0 0 1 16 16Zm-16 168V44H44v168Zm-64-108a36 36 0 0 0-20.2 6.2A8 8 0 0 0 112 112v64a8 8 0 0 0 16 0v-36a20 20 0 0 1 40 0v36a8 8 0 0 0 16 0v-36a36 36 0 0 0-36-36Z"
      />
    </svg>
  );
}
