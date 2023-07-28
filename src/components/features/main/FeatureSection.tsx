import { useStore } from '@/store';
import { classnames } from '@/utils';
import { StepType } from '@reactour/tour';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotVerifyEmail } from '../auth/NotVerifyEmail';
import { QuickSettingSection } from '../quick-setting/QuickSettingSection';
import BlockQuote from '../quotes/BlockQuote';
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
  const settings = useStore((s) => s.settings);
  const currentUser = useStore((s) => s.currentUser);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const isVerify = useMemo(() => {
    if (currentUser === undefined || currentUser === null || !currentUser?.email) return true;
    if (!currentUser?.emailVerified) return false;
    return currentUser.emailVerified;
  }, [currentUser]);

  return (
    <>
      <div className="flexcentercol mb-36 w-full snap-start space-y-16 pt-8">
        {!isVerify ? <NotVerifyEmail /> : <WelcomBanner content={currentUser?.displayName || t('guest')} />}

        <div className="w-full">
          <BlockQuote />
        </div>
      </div>

      {settings.showQuickSetting && <QuickSettingSection />}

      <div
        className={classnames(
          'container mx-auto my-28 max-w-[976px] snap-start',
          'grid grid-flow-row-dense justify-items-center gap-2',
          'grid-cols-1 smmb:grid-cols-2 medtab:grid-cols-4',
          'auto-cols-fr',
          'auto-rows-max'
        )}
      >
        <FeatureCard
          title="Note"
          desc="ideal place to keep your mind on"
          className="bg-gradient-to-tl from-[#5f2c8296] to-[#49a09d96]"
          onClick={() => navigate('/notes')}
        />
        <FeatureCard
          title="Score"
          desc="manage all your score records"
          className="bg-gradient-to-tl from-[#e9644396] to-[#904e9596]"
          onClick={() => navigate('/subjects')}
        />
        <FeatureCard
          title="Analytics"
          desc="variant useful charts"
          className="bg-gradient-to-tl from-[#FC466B96] to-[#8056ca96]"
          onClick={() => navigate('/analytics')}
        />
        <FeatureCard
          title="Tools"
          desc="helpful tools make school life be better"
          className="bg-gradient-to-tl from-[#71B28096] to-[#56B4D396]"
          onClick={() => navigate('/tools')}
        />
      </div>

      <TestimonialContainer />
    </>
  );
};
