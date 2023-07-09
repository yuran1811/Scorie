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
import { GradientUnderline } from '@cpns/interfaces';

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
    <section className="mx-auto my-16 max-w-[1024px] rounded-[3.2rem] bg-zinc-950/80 py-8 text-gray-100 medmb:rounded-[4.2rem] medtab:px-4">
      <div className="container mx-auto flex flex-col items-center p-10">
        <h1 className="typo-lg p-2 text-center font-bold leading-none">{t('what users think')}</h1>
        <GradientUnderline className="mt-3 w-64" />
      </div>
      <FeatureTestimonial votes={[]} content="Good product for everyone" name="Yuran" job={`CEO & Founder Scorie`} />
      <div className="flexcentercol container mx-auto !justify-start lgtab:flex-row lgtab:flex-wrap lgtab:!justify-center lgtab:px-10">
        {testimonials
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((testimonial) => (
            <Testimonial key={testimonial.id} data={testimonial} />
          ))}
      </div>

      {!!currentUser && currentUser?.uid && (
        <Button className="mt-24" content={openModal ? 'Minimize' : 'Open'} onClick={() => setOpenModal((s) => !s)} />
      )}

      {!!currentUser && currentUser?.uid && openModal && (
        <TestimonialAddNew votes={testimonials} data={testimonials.find((item) => item.id === currentUser.uid) || null} />
      )}
    </section>
  );
};
