import { useStore } from '@/store';
import { SettingsType } from '@/shared';
import { Button, Input } from '@cpns/shared';
import { ErrorMessage } from '@cpns/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { successToast } from '@/utils';

export const SettingInfo: FC = () => {
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SettingsType> = (data) => {
    setSettings({ ...settings, ...data });
    successToast()
  };

  return (
    <div className="flexcentercol mt-8 h-4/5 w-full !justify-start overflow-y-auto overflow-x-hidden p-3 pb-8">
      <div className="w-full">
        <form className="flexcentercol mt-8" onSubmit={handleSubmit(onSubmit)}>
          <span className="text-center text-[3.5rem] font-bold">{t('score format')} (9.xxxx)</span>
          <div className="flexcenter w-4/5 flex-wrap">
            <Input
              className="mx-4 flex-1"
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
            <Button className="!text-[3rem]" content="Change" onClick={handleSubmit(onSubmit)} />
          </div>
          {errors?.numberFormat && <ErrorMessage content={errors.numberFormat.message || ''} />}
        </form>

        <div
          className="mt-12 cursor-pointer text-center !text-[3.5rem] font-bold"
          onClick={() =>
            setSettings({
              ...settings,
              showStartUpLogo: !settings.showStartUpLogo,
            })
          }
        >
          {t(settings.showStartUpLogo ? 'show startup logo' : 'hide startup logo')}
          <div className="text-center !text-[2.5rem] !font-normal">{t('click to change')}</div>
        </div>
      </div>
    </div>
  );
};
