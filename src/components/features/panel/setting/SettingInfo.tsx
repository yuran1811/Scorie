import { SettingsType } from '@/shared';
import { useStore } from '@/store';
import { successToast } from '@/utils';
import { ErrorMessage, GradientUnderline } from '@cpns/interfaces';
import { Button, Input, SettingSwitchItem } from '@cpns/shared';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
    values: { ...settings },
  });

  const onSubmit: SubmitHandler<SettingsType> = (data) => {
    setSettings({ ...settings, ...data });
    successToast();
  };

  useEffect(() => {
    return () => {
      unregister('numberFormat');
      unregister('maxRecentScoreNum');
    };
  }, []);

  return (
    <div className="flexcentercol mt-12 h-[calc(100%-4rem)] w-full !justify-start overflow-y-auto overflow-x-hidden">
      <form className="mt-8 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-3 place-items-center items-center">
          <span className="typo-sm col-span-3 text-center font-bold medmb:col-span-2">{t('score format')} (9.xxxx)</span>
          <Input
            className="col-start-2 mx-4 w-full !min-w-[7rem] !max-w-[12rem] medmb:col-start-3"
            type="number"
            inputMode="numeric"
            placeholder="Type a number"
            defaultValue={settings.numberFormat}
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
          {errors?.numberFormat && <ErrorMessage className="col-span-2" content={errors.numberFormat.message || ''} />}

          <span className="typo-sm col-span-3 text-center font-bold medmb:col-span-2">{t('num recent score record')}</span>
          <Input
            className="col-start-2 mx-4 w-full !min-w-[7rem] !max-w-[12rem] medmb:col-start-3"
            type="number"
            inputMode="numeric"
            placeholder="Type a number"
            defaultValue={settings.maxRecentScoreNum}
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
          {errors?.maxRecentScoreNum && (
            <ErrorMessage className="col-span-2" content={errors.maxRecentScoreNum.message || ''} />
          )}
        </div>
        <Button className="itypo-2sm" content="Change" onClick={handleSubmit(onSubmit)} />
      </form>
      <div className="my-4 w-full">
        <GradientUnderline className="medmb:max-w-[28rem]" />
      </div>
      <div>
        <SettingSwitchItem
          enable={settings.showQuickSetting}
          message={{
            enable: 'show quick settings',
            disable: 'hide quick settings',
          }}
          onClick={() =>
            setSettings({
              ...settings,
              showQuickSetting: !settings.showQuickSetting,
            })
          }
        />

        <SettingSwitchItem
          enable={settings.showStartUpLogo}
          message={{
            enable: 'show startup logo',
            disable: 'hide startup logo',
          }}
          onClick={() =>
            setSettings({
              ...settings,
              showStartUpLogo: !settings.showStartUpLogo,
            })
          }
        />

        <SettingSwitchItem
          enable={settings.glassmorphismDesign}
          message={{
            enable: 'turn on transparent effect',
            disable: 'turn off transparent effect',
          }}
          onClick={() =>
            setSettings({
              ...settings,
              glassmorphismDesign: !settings.glassmorphismDesign,
            })
          }
        />
      </div>
    </div>
  );
};
