import { InputProps } from '@/shared';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface CustomInputProps {
  formHandle?: UseFormRegisterReturn;
  hasWrapper?: boolean;
}

export const inputClass =
  'typo-sm isAnimated my-[0.5rem] w-full min-w-[12rem] max-w-[32rem] rounded-[2.4rem] border-[0.3rem] border-solid border-violet-500/30 bg-gray-900 px-[1.8rem] py-[0.5rem] text-white outline-none focus:border-violet-400';

export const Input: FC<CustomInputProps & InputProps> = ({
  hasWrapper,
  formHandle,
  className = '',
  placeholder = '',
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <>
      {!!hasWrapper ? (
        <div className="flexcenter w-full">
          <input
            {...otherProps}
            {...formHandle}
            placeholder={t(placeholder?.toLowerCase())}
            className={`${inputClass} ${className}`}
          />
        </div>
      ) : (
        <input
          {...otherProps}
          {...formHandle}
          placeholder={t(placeholder?.toLowerCase())}
          className={`${inputClass} ${className}`}
        />
      )}
    </>
  );
};
