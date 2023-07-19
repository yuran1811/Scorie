import { EyeIcon } from '@cpns/icons';
import { InputProps } from '@shared/types';
import { FC, useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomInputProps } from './Input';

interface RevealPasswordInputProps extends CustomInputProps {
  inputValue: string;
  changeValue: UseFormReset<any>;
}

const inputContainerClass = 'flexcenter absolute h-full w-full min-w-[35px] min-h-[35px] pr-[55px] pl-8 resize-none';
const inputClass = 'w-full border-0 bg-transparent outline-none';

export const RevealPasswordInput: FC<RevealPasswordInputProps & InputProps> = ({
  inputValue,
  changeValue,
  className,
  placeholder,
  formHandle,
  ...otherProps
}) => {
  const [reveal, setReveal] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="relative h-[54px] w-full max-w-[32rem] overflow-hidden rounded-[2.6rem]">
      <div className={`${inputContainerClass} bg-[#121726]`}>
        <input
          {...otherProps}
          {...formHandle}
          className={`placeholder:typo-3sm typo-semism tracking-widest text-[#575cba] placeholder:align-middle placeholder:tracking-wider ${inputClass}`}
          type="password"
          placeholder={t(placeholder?.toLowerCase() || '')}
        />
      </div>

      <div
        className={`${inputContainerClass} bg-white`}
        style={{
          transition: 'clip-path .3s ease-in-out',
          clipPath: reveal ? `circle(18rem)` : `circle(1.8rem at calc(100% - 2.8rem) 50%)`,
        }}
      >
        <input
          className={`typo-3sm tracking-wider text-black ${inputClass}`}
          type="text"
          value={inputValue ? inputValue : ''}
          onChange={(e) => changeValue({ password: e.currentTarget.value })}
        />
      </div>

      <div
        className="flexcenter absolute right-[9.1px] top-[9px] min-h-[36px] min-w-[36px] cursor-pointer rounded-full"
        onClick={() => setReveal((s) => !s)}
      >
        <EyeIcon width="34" height="34" reveal={reveal} />
      </div>
    </div>
  );
};
