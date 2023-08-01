export const tabListStickyClass =
  'sticky left-0 top-[5.6rem] medmb:top-[6rem] z-10 w-full max-w-full px-4 py-2 medtab:max-w-[920px]';

export const zIdxOrder = {
  behind: 'z-[-1]',
  1: 'z-[1]',
  2: 'z-[2]',
  3: 'z-[3]',
  4: 'z-[4]',
  5: 'z-[5]',
  10: 'z-[10]',
  15: 'z-[15]',
  20: 'z-[20]',
  50: 'z-[50]',
  100: 'z-[100]',
  1000: 'z-[1000]',
};

export const customStyle = {
  underline:
    'after:flex after:items-center after:justify-center after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[0.3rem] after:scale-100 after:origin-center after:w-[100%] after:bg-current',
};

export const averageScore = {
  excellent: { color: '#d9f99d', background: '#15803d' },
  good: { color: '#86efac', background: '#065f46' },
  normal: { color: '#cbd5e1', background: '#1e293b' },
  caution: { color: '#fbbf24', background: '#92400e' },
  danger: { color: '#ef4444', background: '#991b1b' },
  check: (realScore: number, maxScore: number = 10) => {
    const relativeScore = (realScore * 10) / maxScore;

    if (relativeScore >= 9) return 'excellent';
    if (relativeScore >= 8.5) return 'good';
    if (relativeScore > 6.5) return 'normal';
    if (relativeScore > 6) return 'caution';
    return 'danger';
  },
};

export const appThemes: {
  [key: string]: {
    bg: string;
    color: string;
    primary?: string;
    secondary?: string;
  };
} = {
  default: { bg: '#0f172a', color: 'white', secondary: '#475569' },
  red: { bg: '#5c2b29', color: '#fee2e2', secondary: '#f87171' },
  teal: { bg: '#2d555e', color: '#ccfbf1', secondary: '#a2bfc1' },
  blue: { bg: '#1e3a5f', color: '#bfdbfe', secondary: '#7e97b9' },
  purple: { bg: '#42275e', color: '#e9d5ff', secondary: '#a855f7' },
  fuchsia: { bg: '#701a75', color: '#f5d0fe', secondary: '#f5d0fe' },
  pink: { bg: '#5b2245', color: '#fbcfe8', secondary: '#ec4899' },
  rose: { bg: '#9f1239', color: '#fecdd3', secondary: '#fb7185' },
};

export const changeLogStyle: {
  [key: string]: {
    bg: string;
    color: string;
    primary?: string;
    secondary?: string;
  };
} = {
  feature: { bg: '#c4b5fd', color: '#5b21b6' },
  bug: { bg: '#fda4af', color: '#9f1239' },
  update: { bg: '#6ee7b7', color: '#065f46' },
};

export const getThemeStyle = (theme: string) => ({
  backgroundColor: appThemes[theme]?.bg ? appThemes[theme].bg : appThemes.default.bg,
  color: appThemes[theme]?.color ? appThemes[theme].color : appThemes.default.color,
});

export const invertThemeStyle = ({ backgroundColor, color }: { backgroundColor: string; color: string }) => ({
  color: backgroundColor,
  backgroundColor: color,
});
