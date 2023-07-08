import { addNewReport } from '@/services';
import { useStore } from '@/store';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, Overlay, TextArea } from '@cpns/shared';
import { DivProps } from '@shared/types';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  title: string;
  content: string;
}

export const ReportAddNew: FC<
  DivProps & {
    clickHandle: CallableFunction;
  }
> = ({ clickHandle }) => {
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

  return createPortal(
    <div className="fullscreen flexcenter z-20 !justify-start">
      <Overlay zIdx="z-[-1]" onClick={() => clickHandle()} />

      <form
        className="flexcentercol typo-2xl mx-auto line-clamp-1 max-h-[70vh] w-max max-w-[80%] rounded-[2rem] border-2 border-violet-400/30 bg-gray-900/40 px-12 pt-8 text-center font-bold text-teal-700 backdrop-blur-xl lgmb:max-h-[90vh]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="typo-lg text-violet-400">{t('report bugs')}</div>

        <Input
          className="border-violet-500/30 bg-gray-800/60 focus:border-violet-400"
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
          className="max-h-[50rem] min-h-[10rem] border-violet-500/30 bg-gray-800/60 font-normal focus:border-violet-400"
          formHandle={{ ...register('content') }}
        />

        <Button
          className="border-gray-900 bg-violet-400 text-gray-900 hover:border-violet-400 hover:bg-gray-900 hover:text-violet-400"
          type="submit"
          content="Send"
        />
      </form>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
};
