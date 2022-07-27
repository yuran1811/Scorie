import { useCollectionQuery } from '@/hooks';
import { useStore } from '@/store';
import { getTestimonials } from '@/utils/testimonials';
import { FeatureTestimonial, Testimonial } from '@cpns/shared';
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

  useEffect(() => {
    if (loading || error || data === null) return;
    setTestimonials(getTestimonials(data));
  }, [data, loading, error]);

  return (
    <section className="my-16 py-8 bg-gray-800 text-gray-100 rounded-3xl">
      <div className="container flex flex-col items-center mx-auto p-10">
        <h1 className="p-2 text-[3.5rem] font-semibold leading-none text-center">
          {t('what our customers are saying about us')}
        </h1>
      </div>
      <FeatureTestimonial
        votes={[]}
        content="Good product for everyone"
        name="Yuran"
        job={`CEO & Founder Scorie`}
      />
      <div className="container flexcentercol !justify-start mx-auto md:flex-wrap md:flex-row md:!justify-center md:px-10">
        {testimonials
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((testimonial) => (
            <Testimonial key={testimonial.id} data={testimonial} />
          ))}
      </div>

      {!!currentUser && currentUser?.uid && (
        <TestimonialAddNew
          votes={testimonials}
          data={testimonials.find((item) => item.id === currentUser.uid) || null}
        />
      )}
    </section>
  );
};
