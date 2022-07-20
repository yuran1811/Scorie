import { useStore } from '@/store';
import { SettingsType } from '@/shared';
import { Button, Input } from '@cpns/shared';
import { ErrorMessage } from '@cpns/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
    setSettings({ ...data });
  };

  return (
    <div className="flexcentercol !justify-start mt-8 p-3 pb-8 w-full h-[80%] overflow-x-hidden overflow-y-auto">
      <div className="w-full">
        <div>
          <form className="mt-8 flexcentercol" onSubmit={handleSubmit(onSubmit)}>
            <span className="font-bold text-[3.8rem] text-center">
              {t('score format')} (9.xxxx)
            </span>
            <div className="flexcenter flex-wrap">
              <Input
                className="flex-1 mx-4"
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
              <Button
                className="!text-[3.5rem]"
                content="Change"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>

          {errors?.numberFormat && (
            <ErrorMessage className="text-[3rem]" content={errors.numberFormat.message || ''} />
          )}
        </div>

        <div
          className="cursor-pointer font-bold !text-[3.8rem] text-center mt-12"
          onClick={() =>
            setSettings({
              ...settings,
              showStartUpLogo: !settings.showStartUpLogo,
            })
          }
        >
          {t(settings.showStartUpLogo ? 'show startup logo' : 'hide startup logo')}
          <div className="!font-normal !text-[2.3rem] text-center">Click to change</div>
        </div>
      </div>
    </div>
  );
};
