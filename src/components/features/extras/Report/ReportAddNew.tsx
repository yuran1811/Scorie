import { addNewReport } from '@/services';
import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { classnames } from '@/utils';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, FullscreenOverlay, Input, TextArea } from '@cpns/shared';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  title: string;
  content: string;
}

export const ReportAddNew: FC<DivProps & { clickHandle: CallableFunction }> = ({ clickHandle }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.title.trim().length || !data.content.trim().length) return;

    if (currentUser && currentUser?.uid) {
      const reportToAdd = {
        title: data.title.trim(),
        content: data.content.trim(),
      };

      addNewReport(currentUser.uid, reportToAdd).finally(() => {
        clickHandle();
      });
    }
  };

  useEffect(() => {
    return () => {
      unregister('title');
      unregister('content');
    };
  }, []);

  return (
    <FullscreenOverlay overlayInteractive onClick={() => clickHandle()}>
      <form
        className={classnames(
          'flexcentercol mx-auto line-clamp-1 max-h-[70vh] w-max max-w-[80%] gap-3 rounded-[2rem] border-2 border-violet-400/30 bg-gray-900/70 px-12 pb-2 pt-5 text-center font-bold text-teal-700 lgmb:max-h-[90vh]',
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="typo text-violet-400">{t('report bugs')}</div>

        <Input
          placeholder="Title"
          defaultValue=""
          formHandle={{
            ...register('title', {
              validate: {
                isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid title',
              },
            }),
          }}
        />
        {errors?.title && <ErrorMessage content={errors.title.message || ''} />}

        <TextArea
          defaultValue=""
          textareaClass="!max-h-[40vh] min-h-[10rem] font-normal"
          formHandle={{ ...register('content') }}
        />

        <Button type="submit" content="Send" />
      </form>
    </FullscreenOverlay>
  );
};
