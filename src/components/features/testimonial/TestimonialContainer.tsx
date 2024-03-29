import { useCollectionQuery } from '@/hooks';
import { TestimonialProps, db } from '@/shared';
import { useStore } from '@/store';
import { classnames, getTestimonials } from '@/utils';
import { GradientUnderline } from '@cpns/interfaces';
import { Button, FeatureTestimonial, Testimonial } from '@cpns/shared';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { A11y, FreeMode, Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { TestimonialAddNew } from './TestimonialAddNew';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const swiperOptions: SwiperProps = {
  modules: [A11y, Pagination, FreeMode, Grid],

  pagination: {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,
    renderBullet: (idx, className) => `<span class="${className} brightness-150 scale-150 bg-gray-200"></span>`,
  },
  freeMode: {
    enabled: true,
    sticky: true,
    momentumVelocityRatio: 0.4,
  },

  spaceBetween: 10,

  breakpoints: {
    480: { slidesPerView: 3 },
    0: { slidesPerView: 2 },
  },
};

export const TestimonialContainer = () => {
  const currentUser = useStore((s) => s.currentUser);
  const settings = useStore((s) => s.settings);

  const { t } = useTranslation();

  const { data, loading, error } = useCollectionQuery(
    'testimonials',
    query(collection(db, 'testimonials'), orderBy('voteCount', 'desc'), orderBy('updatedAt', 'desc'), limit(12)),
  );

  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (loading || error || data === null) return;
    setTestimonials(getTestimonials(data));
  }, [data, loading, error]);

  return (
    <section
      className={classnames(
        'mx-auto my-16 max-w-[1024px] rounded-[3.2rem] py-8 text-gray-100 medmb:rounded-[4.2rem] medtab:px-4',
        settings.glassmorphismDesign ? 'bg-zinc-950/75' : 'bg-zinc-900',
      )}
    >
      <div className="container mx-auto flex flex-col items-center p-10">
        <h1 className="typo-med p-2 text-center font-bold leading-none">{t('what users think')}</h1>
        <GradientUnderline className="mt-3 w-64" />
      </div>
      <FeatureTestimonial votes={[]} content="Good product for everyone" name="Yuran" job={`CEO & Founder Scorie`} />

      <Swiper
        {...swiperOptions}
        className="flexcentercol mx-auto w-full !justify-start lgtab:flex-row lgtab:flex-wrap lgtab:!justify-center lgtab:px-10"
      >
        {testimonials
          .sort((a, b) => b.votes.length - a.votes.length)
          .map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="mb-14 w-max">
              <Testimonial key={testimonial.id} data={testimonial} />
            </SwiperSlide>
          ))}
      </Swiper>

      {!!currentUser && currentUser?.uid && (
        <Button className="mt-24" content={openModal ? 'Minimize' : 'Open'} onClick={() => setOpenModal((s) => !s)} />
      )}

      {!!currentUser && currentUser?.uid && openModal && (
        <TestimonialAddNew votes={testimonials} data={testimonials.find((item) => item.id === currentUser.uid) || null} />
      )}
    </section>
  );
};
