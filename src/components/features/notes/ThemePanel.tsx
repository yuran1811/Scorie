import { DivProps } from '@/shared';
import { appThemes } from '@/utils';
import { Dispatch, FC, SetStateAction } from 'react';

const themes = { ...appThemes };

interface ThemePanelProps {
  themeSelected?: string;
  setNewTheme: Dispatch<SetStateAction<string>>;
}

export const ThemePanel: FC<ThemePanelProps & DivProps> = ({
  themeSelected,
  className,
  setNewTheme,
  ...otherProps
}) => (
  <div
    {...otherProps}
    className={`${
      className || ''
    } isAnimated origin-top absolute bottom-[-3.5rem] left-0 right-0 p-2 flexcenter flex-wrap bg-slate-800 rounded-[1.6rem]`}
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
