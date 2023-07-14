import { TextAreaProps } from '@/shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  formHandle?: any;
  showIndicator?: boolean;
  containerClass?: string;
  textareaClass?: string;
  bothClass?: string;
}

export const TextArea: FC<Props & TextAreaProps> = ({
  formHandle,
  showIndicator = true,
  className = '',
  containerClass = '',
  textareaClass = '',
  bothClass = '',
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <div className={`relative h-max w-full max-w-[32rem] ${bothClass} ${containerClass}`}>
      <textarea
        {...otherProps}
        {...formHandle}
        className={`typo-sm my-[0.5rem] h-full min-h-[8rem] w-full rounded-[2.5rem] rounded-br-none border-[0.3rem] border-solid border-violet-500/30 bg-gray-900 px-[2rem] py-[1rem] text-white outline-none transition-colors focus:border-violet-400 ${bothClass} ${textareaClass}`}
        placeholder={t('content')}
      />
      {showIndicator && false && (
        <div className="absolute -right-[0.2rem] bottom-[1.6rem] z-[-1] h-[2.2rem] w-[2.2rem] rounded-l-full rounded-t-full bg-violet-400" />
      )}
    </div>
  );
};
