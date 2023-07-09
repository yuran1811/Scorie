import { InputProps } from '@/shared';
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { Tooltip } from '.';

interface SearchBarProps {
  isHide: boolean;
  setSearchOpts: Dispatch<
    SetStateAction<{
      isSearch: boolean;
      value: string;
    }>
  >;
}

export const SearchBar: FC<SearchBarProps & InputProps> = ({ isHide = false, setSearchOpts, onChange }) => {
  const [isActive, setActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return isHide ? (
    <></>
  ) : (
    <div className="flexcenter relative my-4 mb-8 h-[6rem] w-4/5">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          ref={inputRef}
          className={`typo-sm border-4 border-solid border-white outline-none
					${
            isActive
              ? 'h-[6rem] w-[100vw] rounded-none py-[0.8rem] pl-[2rem] pr-[5.5rem] medmb:w-[36rem]'
              : 'h-[5rem] w-[5rem] rounded-[5rem]'
          }`}
          style={{
            background: 'none',
            transition: 'width 0.4s 0.1s ease-in-out, border-radius 0.4s 0.2s ease-in-out, padding 0.2s 0.4s',
          }}
          type="text"
          inputMode="search"
          disabled={!isActive}
          onChange={onChange}
          onBlur={(e) => {
            setActive(!!e?.currentTarget?.value?.trim()?.length);
            setSearchOpts((s) => ({ ...s, isSearch: !e?.currentTarget?.value?.trim()?.length }));
          }}
        />
        <Tooltip content="Tap to search" options={{ delay: 400 }}>
          <button
            className={`isAnimated before:isAnimated after:isAnimated absolute bottom-0 right-0 top-0 h-[5rem] w-[5rem] cursor-pointer border-none bg-none before:absolute before:bottom-[-1.6rem] before:right-[-0.6rem] before:h-[2.5rem] before:w-[0.4rem] before:rotate-[-45deg] before:bg-white before:content-[""] ${
              isActive &&
              `!h-[6rem] !w-[6rem] before:absolute before:bottom-[1.2rem] before:right-[2.8rem] before:h-[3.4rem] before:w-[0.4rem] before:bg-white before:content-[""] after:absolute after:bottom-[1.2rem] after:right-[2.8rem] after:h-[3.4rem] after:w-[0.4rem] after:rotate-45 after:bg-white after:content-[""]`
            }`}
            style={{ background: 'none' }}
            onClick={() => {
              if (isActive && inputRef !== null && inputRef?.current) {
                inputRef.current.value = '';
                setSearchOpts({
                  isSearch: false,
                  value: '',
                });
              }
              setActive((s) => !s);
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};
