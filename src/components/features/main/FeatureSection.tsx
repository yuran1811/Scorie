import { useStore } from '@/store';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotVerifyEmail } from '../auth/NotVerifyEmail';
import { TestimonialContainer } from '../testimonial/TestimonialContainer';
import { FeatureCard } from './FeatureCard';
import { WelcomBanner } from './WelcomBanner';

export const FeatureSection: FC = () => {
  const currentUser = useStore((s) => s.currentUser);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const isVerify = useMemo(() => {
    if (currentUser === undefined || currentUser === null) return true;
    if (!currentUser?.emailVerified) return false;
    return currentUser.emailVerified;
  }, [currentUser]);

  return (
    <>
      {!isVerify ? (
        <NotVerifyEmail />
      ) : (
        <WelcomBanner>{currentUser?.displayName || t('guest')}</WelcomBanner>
      )}

      <div className="flexcenter my-12 w-full flex-wrap py-8">
        <FeatureCard
          className="bg-gradient-to-tl from-[#5f2c82] to-[#49a09d]"
          title="Note"
          onClick={() => navigate('/notes')}
        >
          <div className="py-4 px-6 mobile:p-8">{t('ideal place to keep your mind on')}</div>
        </FeatureCard>

        <FeatureCard
          className="bg-gradient-to-tl from-[#e96443] to-[#904e95]"
          title="Score"
          onClick={() => navigate('/subjects')}
        >
          <div className="py-4 px-6 mobile:p-8">{t('manage all your score records')}</div>
        </FeatureCard>

        <FeatureCard
          className="bg-gradient-to-tl from-[#FC466B] to-[#8056ca]"
          title="Analytics"
          onClick={() => navigate('/analytics')}
        >
          <div className="py-4 px-6 mobile:p-8">{t('variant useful charts')}</div>
        </FeatureCard>

        <FeatureCard
          className="bg-gradient-to-tl from-[#71B280] to-[#56B4D3]"
          title="Tools"
          onClick={() => navigate('/tools')}
        >
          <div className="py-4 px-6 mobile:p-8">
            {t('helpful tools make school life be better')}
          </div>
        </FeatureCard>
      </div>

      <TestimonialContainer />
    </>
  );
};
