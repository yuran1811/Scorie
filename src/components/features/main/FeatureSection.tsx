import { useStore } from 'store';
import { featureRoutes } from 'routes';
import { FeatureCard } from './FeatureCard';
import { WelcomBanner } from './WelcomBanner';
import { NotVerifyEmail } from '../auth/NotVerifyEmail';
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
				<FeatureCard
					className='bg-gradient-to-tl from-[#5f2c82] to-[#49a09d]'
					title='Note'
					onClick={() => navigate('/notes')}
				>
					<div className='py-4 px-6 mobile:p-8'>Ideal place to keep your mind on</div>
				</FeatureCard>

				<FeatureCard
					className='bg-gradient-to-tl from-[#e96443] to-[#904e95]'
					title='Score'
					onClick={() => navigate('/subjects')}
				>
					<div className='py-4 px-6 mobile:p-8'>Manage all your score records</div>
				</FeatureCard>

				<FeatureCard
					className='bg-gradient-to-tl from-[#FC466B] to-[#8056ca]'
					title='Analytics'
					onClick={() => navigate('/analytics')}
				>
					<div className='py-4 px-6 mobile:p-8'>Variant useful charts</div>
				</FeatureCard>

				<FeatureCard
					className='bg-gradient-to-tl from-[#71B280] to-[#56B4D3]'
					title='Tools'
					onClick={() => navigate('/tools')}
				>
					<div className='py-4 px-6 mobile:p-8'>Helpful tools make school life be better</div>
				</FeatureCard>

				{/* {featureRoutes.map(({ path, color, content, title }) => (
					<FeatureCard
						key={path}
						className={`${color || ''}`}
						title={title}
						// onClick={() => navigate(`/${path}`)}
					>
						<div className='py-4 px-6 mobile:p-8'>{content}</div>
					</FeatureCard>
				))} */}
			</div>
		</>
	);
};
