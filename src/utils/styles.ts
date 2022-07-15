export const customStyle = {
	underline:
		'after:flex after:items-center after:justify-center after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[0.3rem] after:scale-100 after:origin-center after:w-[100%] after:bg-current',
};

export const averageScore = {
	excellent: { color: '#86efac', background: '#065f46' },
	good: { color: '#d9f99d', background: '#15803d' },
	normal: { color: '#cbd5e1', background: '#1e293b' },
	caution: { color: '#fbbf24', background: '#92400e' },
	danger: { color: '#ef4444', background: '#991b1b' },
	check: (x: number) => {
		if (x >= 9) return 'excellent';
		if (x >= 8.5) return 'good';
		if (x > 6.5) return 'normal';
		if (x > 6) return 'caution';
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
	fuchsia: { bg: '#701a75', color: '#f5d0fe', secondary: '#c026d3' },
	pink: { bg: '#5b2245', color: '#fbcfe8', secondary: '#ec4899' },
	rose: { bg: '#9f1239', color: '#fecdd3', secondary: '#fb7185' },
};

export const getThemeStyle = (theme: string) => ({
	backgroundColor: appThemes[theme]?.bg ? appThemes[theme].bg : appThemes.default.bg,
	color: appThemes[theme]?.color ? appThemes[theme].color : appThemes.default.color,
});
