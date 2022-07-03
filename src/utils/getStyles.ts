export const customStyle = {
	underline:
		'after:flex after:items-center after:justify-center after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[0.3rem] after:scale-100 after:origin-center after:w-[100%] after:bg-current',
};

export const averageScore = {
	good: '#86efac',
	need: '#d9f99d',
	normal: '#cbd5e1',
	caution: '#fbbf24',
	danger: '#ef4444',
	check: (x: number) => {
		if (x >= 9) return 'good';
		if (x >= 8.5) return 'need';
		if (x > 6.5) return 'normal';
		if (x > 6) return 'caution';
		return 'danger';
	},
};

export const noteThemes: {
	[key: string]: {
		bg: string;
		color: string;
	};
} = {
	default: { bg: '#0f172a', color: 'white' },
	red: { bg: '#5c2b29', color: '#fee2e2' },
	teal: { bg: '#2d555e', color: '#ccfbf1' },
	blue: { bg: '#1e3a5f', color: '#bfdbfe' },
	purple: { bg: '#42275e', color: '#e9d5ff' },
	fuchsia: { bg: '#701a75', color: '#f5d0fe' },
	pink: { bg: '#5b2245', color: '#fbcfe8' },
	rose: { bg: '#9f1239', color: '#fecdd3' },
};
