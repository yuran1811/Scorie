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
