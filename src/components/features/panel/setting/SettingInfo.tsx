import { useStore } from '@/store';
import { SettingsType } from '@/shared';
import { Button, Input } from '@cpns/shared';
import { ErrorMessage, GradientUnderline } from '@cpns/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { successToast } from '@/utils';

export const SettingInfo: FC = () => {
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);

  const { t } = useTranslation();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsType>({
    mode: 'onChange',
    values: {
      glassmorphismDesign: settings.glassmorphismDesign,
      maxRecentScoreNum: settings.maxRecentScoreNum,
      numberFormat: settings.numberFormat,
      showQuickSetting: settings.showQuickSetting,
      showStartUpLogo: settings.showStartUpLogo,
    },
  });

  const onSubmit: SubmitHandler<SettingsType> = (data) => {
    setSettings({ ...settings, ...data });
    successToast();
  };

  useEffect(() => {
    return () => {
      unregister('numberFormat');
    };
  }, []);

  return (
    <div className="flexcentercol mt-8 h-4/5 w-full !justify-start overflow-y-auto overflow-x-hidden p-3 pb-4">
      <div className="w-full">
        <form className="flexcentercol mt-8" onSubmit={handleSubmit(onSubmit)}>
          <span className="typo text-center font-bold">{t('score format')} (9.xxxx)</span>
          <div className="flexcenter w-4/5 flex-wrap">
            <Input
              className="mx-4 !max-w-xs flex-1"
              placeholder="Type a number"
              defaultValue={settings.numberFormat}
              inputMode="numeric"
              formHandle={{
                ...register('numberFormat', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.toString().trim().length !== 0 || 'Cannot be empty',
                    isNumber: (v) => /^\d+$/.test(v.toString().trim()) || 'Not a number',
                  },
                }),
              }}
            />
          </div>
          {errors?.numberFormat && <ErrorMessage content={errors.numberFormat.message || ''} />}

          <span className="typo text-center font-bold">{t('num recent score record')}</span>
          <div className="flexcenter w-4/5 flex-wrap">
            <Input
              className="mx-4 !max-w-xs flex-1"
              placeholder="Type a number"
              defaultValue={settings.maxRecentScoreNum}
              inputMode="numeric"
              formHandle={{
                ...register('maxRecentScoreNum', {
                  required: 'Please fill in this field',
                  validate: {
                    notEmpty: (v) => v.toString().trim().length !== 0 || 'Cannot be empty',
                    isNumber: (v) => /^\d+$/.test(v.toString().trim()) || 'Not a number',
                  },
                }),
              }}
            />
          </div>
          {errors?.numberFormat && <ErrorMessage content={errors.numberFormat.message || ''} />}

          <Button className="itypo-2sm" content="Change" onClick={handleSubmit(onSubmit)} />
        </form>

        <GradientUnderline />

        <div
          className="typo mt-10 cursor-pointer text-center font-bold"
          onClick={() =>
            setSettings({
              ...settings,
              showStartUpLogo: !settings.showStartUpLogo,
            })
          }
        >
          {t(settings.showStartUpLogo ? 'show startup logo' : 'hide startup logo')}
          <div className="typo-sm text-center !font-normal">{t('click to change')}</div>
        </div>

        <div
          className="typo mt-10 cursor-pointer text-center font-bold"
          onClick={() =>
            setSettings({
              ...settings,
              glassmorphismDesign: !settings.glassmorphismDesign,
            })
          }
        >
          {t(settings.glassmorphismDesign ? 'turn on blur effect' : 'turn off blur effect')}
          <div className="typo-sm text-center !font-normal">{t('click to change')}</div>
        </div>
      </div>
    </div>
  );
};
