import { Dispatch, FC, SetStateAction } from 'react';
import { DivProps } from 'shared';
import { noteThemes } from 'utils';

const themes = { ...noteThemes };

interface ThemePanelProps {
	themeSelected?: string;
	setNewTheme: Dispatch<SetStateAction<string>>;
}

export const ThemePanel: FC<ThemePanelProps & DivProps> = ({ themeSelected, className, setNewTheme }) => (
	<div
		className={`${
			className || ''
		} absolute bottom-[-10rem] left-0 p-2 flexcenter flex-wrap bg-slate-800 rounded-[1.6rem]`}
	>
		{Object.entries(themes).map(([key, { bg, color }]) => (
			<div
				key={key}
				style={{ color, backgroundColor: bg }}
				className={`cursor-pointer w-[2.8rem] h-[2.8rem] m-2 rounded-[50%] border-[0.2rem] ${
					themeSelected === key ? 'border-red-400' : 'border-white'
				}`}
				onClick={() => setNewTheme(key)}
			/>
		))}
	</div>
);
