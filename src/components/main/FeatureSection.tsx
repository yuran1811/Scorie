import { NotVerifyEmail } from 'components/auth/NotVerifyEmail';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'store';
import { FeatureCard } from './FeatureCard';
import { WelcomBanner } from './WelcomBanner';

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
					<div className='p-6'>Ideal place to keep your mind on</div>
				</FeatureCard>
				<FeatureCard className='bg-sky-500' title='Score' onClick={() => navigate('/scores')}>
					<div className='p-6'>Manage all your score records</div>
				</FeatureCard>
				<FeatureCard className='bg-teal-400' title='Analytics' onClick={() => navigate('/chart')}>
					<div className='p-6'>Variant useful charts</div>
				</FeatureCard>
				<FeatureCard className='bg-red-400' title='Tools' onClick={() => navigate('/tools')}>
					<div className='p-6'>Helpful tools make school life be better</div>
				</FeatureCard>
			</div>
		</>
	);
};
