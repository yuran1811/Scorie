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

const inputContainerClass =
  'flexcenter absolute h-full w-full min-w-[33px] min-h-[33px] pr-[86px] pl-16';
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
    <div className="relative h-[68px] w-full max-w-[32rem] overflow-hidden rounded-[2rem]">
      <div className={`${inputContainerClass} bg-[#121726]`}>
        <input
          {...otherProps}
          {...formHandle}
          className={`${inputClass} text-[2.4rem] tracking-widest text-[#575cba]`}
          type="password"
          placeholder={t(placeholder?.toLowerCase() || '')}
        />
      </div>

      <div
        className={`${inputContainerClass} bg-white`}
        style={{
          transition: 'clip-path .3s ease-in-out',
          clipPath: reveal ? `circle(85%)` : `circle(8% at 87% 50%)`,
        }}
      >
        <input
          className={`${inputClass} text-[1.8rem] tracking-wider text-black`}
          type="text"
          value={inputValue}
          onChange={(e) => changeValue({ password: e.currentTarget.value })}
        />
      </div>

      <div
        className="flexcenter absolute top-[18px] right-[7%] min-h-[36px] min-w-[36px] cursor-pointer rounded-full"
        onClick={() => setReveal((s) => !s)}
      >
        <EyeIcon width="36" height="36" reveal={reveal} />
      </div>
    </div>
  );
};
