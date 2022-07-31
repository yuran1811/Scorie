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

const inputContainerClass = 'flexcenter absolute h-full w-full pr-[86px] pl-16';
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
    <div className="relative h-[68px] w-[32rem] overflow-hidden rounded-[2rem]">
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
          transition: 'clip-path 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          clipPath: reveal
            ? `polygon( 2.28031% 0%, 14.21024% 0.00147%, 26.14016% 0%, 38.07008% 0.00147%, 50% 0%, 61.92992% 0.00147%, 73.85984% 0%, 85.78976% 0.00147%, 97.71969% 0%, 98.18037% 0.23084%, 98.60894% 0.89324%, 98.99635% 1.94205%, 99.33358% 3.33211%, 99.61159% 5.01825%, 99.82135% 6.95531%, 99.95383% 9.09814%, 100% 11.40157%, 100.00029% 21.05118%, 100% 30.70079%, 100.00029% 40.35039%, 100% 50%, 100.00029% 59.64961%, 100% 69.29921%, 100.00029% 78.94882%, 100% 88.59843%, 99.95383% 90.90186%, 99.82135% 93.04469%, 99.61159% 94.98175%, 99.33358% 96.66789%, 98.99635% 98.05795%, 98.60894% 99.10676%, 98.18037% 99.76916%, 97.71969% 100%, 85.78976% 100.00147%, 73.85984% 100%, 61.92992% 100.00147%, 50% 100%, 38.07008% 100.00147%, 26.14016% 100%, 14.21024% 100.00147%, 2.28031% 100%, 1.81963% 99.76916%, 1.39106% 99.10676%, 1.00365% 98.05795%, 0.66642% 96.66789%, 0.38841% 94.98175%, 0.17865% 93.04469%, 0.04617% 90.90186%, 0% 88.59843%, 0.00029% 78.94882%, 0% 69.29921%, 0.00029% 59.64961%, 0% 50%, 0.00029% 40.35039%, 0% 30.70079%, 0.00029% 21.05118%, 0% 11.40157%, 0.04617% 9.09814%, 0.17865% 6.95531%, 0.38841% 5.01825%, 0.66642% 3.33211%, 1.00365% 1.94205%, 1.39106% 0.89324%, 1.81963% 0.23084%)`
            : `polygon( 85.39075% 28.16254%, 85.86161% 27.31304%, 86.33801% 26.7167%, 86.81675% 26.36695%, 87.29462% 26.25723%, 87.7684% 26.38091%, 88.23487% 26.73144%, 88.69081% 27.30221%, 89.13302% 28.08664%, 89.55826% 29.07816%, 89.96332% 30.27017%, 90.345% 31.6561%, 90.70007% 33.22935%, 91.02531% 34.98333%, 91.31751% 36.91147%, 91.57346% 39.00718%, 91.78992% 41.26386%, 91.95983% 43.6181%, 92.0791% 46.00012%, 92.14904% 48.39386%, 92.17099% 50.78321%, 92.14625% 53.15209%, 92.07615% 55.48444%, 91.96199% 57.76415%, 91.80511% 59.97518%, 91.6068% 62.10138%, 91.3684% 64.12672%, 91.09122% 66.0351%, 90.77657% 67.81044%, 90.42577% 69.43666%, 90.04014% 70.89766%, 89.621% 72.17737%, 89.16967% 73.25972%, 88.69881% 74.10923%, 88.22241% 74.70556%, 87.74366% 75.05532%, 87.26579% 75.16504%, 86.79201% 75.04135%, 86.32555% 74.69083%, 85.86961% 74.12006%, 85.4274% 73.33563%, 85.00216% 72.3441%, 84.59709% 71.15209%, 84.21541% 69.76616%, 83.86035% 68.19292%, 83.53511% 66.43893%, 83.2429% 64.51079%, 82.98696% 62.41508%, 82.77049% 60.1584%, 82.60059% 57.80416%, 82.48132% 55.42214%, 82.41137% 53.0284%, 82.38942% 50.63905%, 82.41416% 48.27017%, 82.48427% 45.93782%, 82.59843% 43.65811%, 82.75531% 41.4471%, 82.95362% 39.3209%, 83.19202% 37.29556%, 83.4692% 35.38717%, 83.78385% 33.61184%, 84.13465% 31.98561%, 84.52027% 30.5246%, 84.93942% 29.2449%)`,
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
        className="absolute top-[18px] right-[2.5rem] h-[33px] w-[33px] cursor-pointer rounded-full"
        onClick={() => setReveal((s) => !s)}
      >
        <EyeIcon className="absolute left-0 top-[-1px]" width="36" height="36" reveal={reveal} />
      </div>
    </div>
  );
};
