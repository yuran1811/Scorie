import { addNewFeedback, deleteFeedback } from '@/services';
import { useStore } from '@/store';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, Input, ModalUI, TextArea } from '@cpns/shared';
import { TestimonialProps } from '@shared/types';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Inputs {
  content: string;
  name: string;
  job: string;
}

interface TestimonialAddNewProps {
  data: TestimonialProps | null;
  votes: TestimonialProps[];
}

export const TestimonialAddNew: FC<TestimonialAddNewProps> = ({ data, votes }) => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const deleteHandle = () => {
    if (currentUser && currentUser?.uid) {
      deleteFeedback(currentUser.uid);
    }

    setOpenModal(false);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (currentUser && currentUser?.uid) {
      if (
        !data.content.length &&
        !data.job.length &&
        !data.name.length &&
        votes.find((vote) => vote.id === currentUser.uid)
      ) {
        setOpenModal(true);
        return;
      }

      const feedbackToAdd = {
        content: data.content.trim(),
        name: data.name.trim(),
        job: data.job.trim(),
        votes: [],
      };

      addNewFeedback(currentUser.uid, feedbackToAdd);
    }
  };

  return (
    <form
      className="flexcentercol mx-auto mt-24 p-8 font-bold text-[5rem] text-center text-teal-700 w-max max-w-[80%] line-clamp-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="bg-gray-900 focus:border-violet-400"
        placeholder="Name"
        defaultValue={data ? data.name : ''}
        formHandle={{
          ...register('name', {
            validate: {
              isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid name',
            },
          }),
        }}
      />
      {errors?.name && <ErrorMessage className="text-[3rem]" content={errors.name.message || ''} />}

      <Input
        className="bg-gray-900 focus:border-violet-400"
        placeholder="Job"
        defaultValue={data ? data.job : ''}
        formHandle={{
          ...register('job', {
            validate: {
              isValid: (v) => /[\w\d\s]*/.test(v.trim()) || 'Invalid job',
            },
          }),
        }}
      />
      {errors?.job && <ErrorMessage className="text-[3rem]" content={errors.job.message || ''} />}

      <TextArea
        defaultValue={data ? data.content : ''}
        className="font-normal min-h-[10rem] max-h-[50rem] bg-gray-900 focus:border-violet-400"
        formHandle={{ ...register('content') }}
      />

      <Button
        className="!text-[3rem] bg-violet-400 text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-violet-400 hover:border-violet-400"
        type="submit"
        content="Send"
      />

      {openModal && (
        <ModalUI
          title={t('delete action')}
          onClick={() => deleteHandle()}
          cancelHandle={() => setOpenModal(false)}
        >
          <p className="text-[3rem] p-4">{t('this will delete your feedback')}</p>
        </ModalUI>
      )}
    </form>
  );
};
