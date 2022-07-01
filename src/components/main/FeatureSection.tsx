import { useStore } from 'store';
import { FeatureCard } from './FeatureCard';
import { WelcomBanner } from './WelcomBanner';
import { NotVerifyEmail } from 'components/auth/NotVerifyEmail';
import { useNavigate } from 'react-router-dom';
import { FC, useMemo } from 'react';

export const FeatureSection: FC = () => {
	const currentUser = useStore((s) => s.currentUser);

	const navigate = useNavigate();

	const isVerify = useMemo(() => {
		if (currentUser === undefined || currentUser === null) return true;

		if (!currentUser?.emailVerified) return false;

		return currentUser.emailVerified;
	}, [currentUser]);

	return (
		<>
			{!isVerify ? <NotVerifyEmail /> : <WelcomBanner>{currentUser?.displayName || 'Guest'}</WelcomBanner>}

			<div className='flexcenter flex-wrap w-full pt-8'>
				<FeatureCard className='bg-purple-500' title='Note' onClick={() => navigate('/notes')}>
					<div className='py-4 px-6 mobile:p-8'>Ideal place to keep your mind on</div>
				</FeatureCard>
				<FeatureCard className='bg-sky-500' title='Score' onClick={() => navigate('/subjects')}>
					<div className='py-4 px-6 mobile:p-8'>Manage all your score records</div>
				</FeatureCard>
				<FeatureCard className='bg-teal-400' title='Analytics' onClick={() => navigate('/chart')}>
					<div className='py-4 px-6 mobile:p-8'>Variant useful charts</div>
				</FeatureCard>
				<FeatureCard className='bg-red-400' title='Tools' onClick={() => navigate('/tools')}>
					<div className='py-4 px-6 mobile:p-8'>Helpful tools make school life be better</div>
				</FeatureCard>
			</div>
		</>
	);
};
