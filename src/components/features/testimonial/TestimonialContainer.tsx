import { useCollectionQuery } from '@/hooks';
import { useStore } from '@/store';
import { getTestimonials } from '@/utils';
import { Button, FeatureTestimonial, Testimonial } from '@cpns/shared';
import { db } from '@shared/firebase';
import { TestimonialProps } from '@shared/types';
import { collection, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TestimonialAddNew } from './TestimonialAddNew';

export const TestimonialContainer = () => {
  const currentUser = useStore((s) => s.currentUser);

  const { t } = useTranslation();

  const { data, loading, error } = useCollectionQuery(
    'testimonials',
    query(collection(db, 'testimonials'), orderBy('updatedAt', 'desc'))
  );

  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (loading || error || data === null) return;
    setTestimonials(getTestimonials(data));
  }, [data, loading, error]);

  return (
    <section className="-mx-10 my-16 rounded-3xl bg-gray-800 py-8 text-gray-100 sm:mx-0">
      <div className="container mx-auto flex flex-col items-center p-10">
        <h1 className="p-2 text-center text-[3.5rem] font-semibold leading-none">
          {t('what our customers are saying about us')}
        </h1>
      </div>
      <FeatureTestimonial
        votes={[]}
        content="Good product for everyone"
        name="Yuran"
        job={`CEO & Founder Scorie`}
      />
      <div className="flexcentercol container mx-auto !justify-start md:flex-row md:flex-wrap md:!justify-center md:px-10">
        {testimonials
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((testimonial) => (
            <Testimonial key={testimonial.id} data={testimonial} />
          ))}
      </div>

      {!!currentUser && currentUser?.uid && (
        <Button
          className="mt-24 border-gray-900 bg-violet-400 !text-[3rem] text-gray-900 hover:border-violet-400 hover:bg-gray-900 hover:text-violet-400"
          content={openModal ? 'Minimize' : 'Open'}
          onClick={() => setOpenModal((s) => !s)}
        />
      )}

      {!!currentUser && currentUser?.uid && openModal && (
        <TestimonialAddNew
          votes={testimonials}
          data={testimonials.find((item) => item.id === currentUser.uid) || null}
        />
      )}
    </section>
  );
};
