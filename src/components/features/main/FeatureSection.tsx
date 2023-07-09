import { useStore } from '@/store';
import { StepType } from '@reactour/tour';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotVerifyEmail } from '../auth/NotVerifyEmail';
import { TestimonialContainer } from '../testimonial/TestimonialContainer';
import { FeatureCard } from './FeatureCard';
import { WelcomBanner } from './WelcomBanner';

export const mainSteps: StepType[] = [
  {
    selector: 'body',
    content: <h2 className="tourTitle">Hello, Scorier</h2>,
    position: 'center',
  },
];

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
      {!isVerify ? <NotVerifyEmail /> : <WelcomBanner>{currentUser?.displayName || t('guest')}</WelcomBanner>}

      <div className="flexcenter my-12 w-full flex-wrap py-8">
        <FeatureCard
          className="bg-gradient-to-tl from-[#5f2c8296] to-[#49a09d96]"
          title="Note"
          onClick={() => navigate('/notes')}
        >
          <div className="p-2 medmb:px-6 medmb:py-4 lgmb:p-6">{t('ideal place to keep your mind on')}</div>
        </FeatureCard>

        <FeatureCard
          className="bg-gradient-to-tl from-[#e9644396] to-[#904e9596]"
          title="Score"
          onClick={() => navigate('/subjects')}
        >
          <div className="p-2 medmb:px-6 medmb:py-4 lgmb:p-6">{t('manage all your score records')}</div>
        </FeatureCard>

        <FeatureCard
          className="bg-gradient-to-tl from-[#FC466B96] to-[#8056ca96]"
          title="Analytics"
          onClick={() => navigate('/analytics')}
        >
          <div className="p-2 medmb:px-6 medmb:py-4 lgmb:p-6">{t('variant useful charts')}</div>
        </FeatureCard>

        <FeatureCard
          className="bg-gradient-to-tl from-[#71B28096] to-[#56B4D396]"
          title="Tools"
          onClick={() => navigate('/tools')}
        >
          <div className="p-2 medmb:px-6 medmb:py-4 lgmb:p-6">{t('helpful tools make school life be better')}</div>
        </FeatureCard>
      </div>

      <TestimonialContainer />
    </>
  );
};
