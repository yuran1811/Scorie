import { motion } from 'framer-motion';
import { animateLogoBackground, animateLogoText } from './variants';

export const AnimateLogoBackground = () => (
	<motion.svg
		width='1200'
		height='900'
		viewBox='0 0 900 600'
		xmlns='http://www.w3.org/2000/svg'
		style={{
			width: '56%',
			overflow: 'visible',
			stroke: '#596886',
			strokeWidth: '2',
			strokeLinejoin: 'round',
			strokeLinecap: 'round',
		}}
	>
		<g transform='translate(445.66010753433636 323.89787957059747)'>
			<motion.path
				d='M140.2 -148.9C199.6 -149.7 278.1 -132.8 282.5 -97C286.9 -61.3 217.2 -6.7 179.6 42.7C142 92.1 136.5 136.2 112 143.9C87.4 151.5 43.7 122.6 0.5 122C-42.7 121.3 -85.4 148.8 -140.9 151.2C-196.4 153.6 -264.6 130.9 -273.1 91.8C-281.5 52.7 -230.2 -2.7 -205.5 -63.2C-180.9 -123.7 -183 -189.3 -153.2 -198.1C-123.4 -206.9 -61.7 -158.9 -10.7 -144.2C40.4 -129.6 80.7 -148.1 140.2 -148.9'
				variants={animateLogoBackground}
				initial='hidden'
				animate='visible'
				transition={{
					default: { duration: 1.5, ease: 'easeInOut' },
					fill: { duration: 1.5, ease: [1, 0, 0.8, 1] },
					delay: 0.2,
				}}
			/>
		</g>
	</motion.svg>
);

export const AnimateLogoText = () => (
	<motion.svg
		width='289.025px'
		height='122px'
		xmlns='http://www.w3.org/2000/svg'
		viewBox='105.48750000000001 14 289.025 122'
		preserveAspectRatio='xMidYMid'
		style={{
			width: '56%',
			overflow: 'visible',
			stroke: '#ffd5af',
			strokeWidth: '2',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		}}
	>
		<defs>
			<filter id='editing-hover' x='-100%' y='-100%' width='300%' height='300%'>
				<feFlood floodColor='#052b4a' result='flood' />
				<feComposite operator='in' in2='SourceAlpha' in='flood' result='shadow' />
				<feOffset dx='-4' dy='-4' in='SourceGraphic' result='offset-1' />
				<feOffset dx='4' dy='4' in='shadow' result='offset-2' />{' '}
				<feMerge>
					<feMergeNode in='offset-2' />
					<feMergeNode in='offset-1' />
				</feMerge>
			</filter>
		</defs>
		<g filter='url(#editing-hover)'>
			<g transform='translate(151.5738421678543, 99)'>
				<motion.path
					variants={animateLogoText}
					initial='hidden'
					animate='visible'
					transition={{
						default: { duration: 1.6, ease: 'linear' },
						fill: { duration: 1.6, ease: 'easeInOut' },
					}}
					d='M26.05-29.57L26.05-29.57L26.05-29.57Q27.01-31.49 27.01-33.28L27.01-33.28L27.01-33.28Q27.01-35.07 26.82-36.06L26.82-36.06L26.82-36.06Q26.62-37.06 26.18-37.82L26.18-37.82L26.18-37.82Q25.22-39.49 23.30-39.49L23.30-39.49L23.30-39.49Q20.93-39.49 19.01-37.76L19.01-37.76L19.01-37.76Q16.96-35.97 16.96-33.15L16.96-33.15L16.96-33.15Q16.96-31.36 18.21-29.98L18.21-29.98L18.21-29.98Q19.46-28.61 21.38-27.33L21.38-27.33L21.38-27.33Q23.30-26.05 25.47-24.77L25.47-24.77L25.47-24.77Q27.65-23.49 29.57-21.95L29.57-21.95L29.57-21.95Q33.98-18.43 33.98-13.70L33.98-13.70L33.98-13.70Q33.98-10.50 32.29-7.78L32.29-7.78L32.29-7.78Q30.59-5.06 27.78-3.07L27.78-3.07L27.78-3.07Q21.63 1.28 13.50 1.28L13.50 1.28L13.50 1.28Q6.91 1.28 3.52-0.86L3.52-0.86L3.52-0.86Q0.13-3.01 0.13-6.27L0.13-6.27L0.13-6.27Q0.13-12.10 4.67-13.57L4.67-13.57L4.67-13.57Q5.95-14.02 7.90-14.02L7.90-14.02L7.90-14.02Q9.86-14.02 12.10-13.18L12.10-13.18L12.10-13.18Q11.07-10.56 11.07-8.19L11.07-8.19L11.07-8.19Q11.07-3.07 14.72-3.07L14.72-3.07L14.72-3.07Q17.09-3.07 19.04-4.80L19.04-4.80L19.04-4.80Q20.99-6.53 20.99-8.48L20.99-8.48L20.99-8.48Q20.99-10.43 19.74-11.84L19.74-11.84L19.74-11.84Q18.50-13.25 16.64-14.37L16.64-14.37L16.64-14.37Q14.78-15.49 12.64-16.58L12.64-16.58L12.64-16.58Q10.50-17.66 8.64-19.20L8.64-19.20L8.64-19.20Q4.29-22.72 4.29-28.35L4.29-28.35L4.29-28.35Q4.29-32 6.08-34.85L6.08-34.85L6.08-34.85Q7.87-37.70 10.75-39.62L10.75-39.62L10.75-39.62Q16.51-43.52 23.58-43.52L23.58-43.52L23.58-43.52Q30.66-43.52 34.08-41.41L34.08-41.41L34.08-41.41Q37.50-39.30 37.50-35.71L37.50-35.71L37.50-35.71Q37.50-32.58 35.07-30.59L35.07-30.59L35.07-30.59Q32.96-28.93 30.40-28.93L30.40-28.93L30.40-28.93Q27.84-28.93 26.05-29.57ZM70.27-26.62L70.27-26.62L70.27-26.62Q70.27-23.94 68.03-22.27L68.03-22.27L68.03-22.27Q65.79-20.61 62.14-20.61L62.14-20.61L62.14-20.61Q60.61-20.61 59.71-21.06L59.71-21.06L59.71-21.06Q60.42-22.72 60.64-24.80L60.64-24.80L60.64-24.80Q60.86-26.88 60.86-27.46L60.86-27.46L60.86-27.46Q60.86-30.14 59.01-30.14L59.01-30.14L59.01-30.14Q57.73-30.14 56.29-28.54L56.29-28.54L56.29-28.54Q54.85-26.94 53.63-24.45L53.63-24.45L53.63-24.45Q50.94-18.69 50.94-12.86L50.94-12.86L50.94-12.86Q50.94-9.66 52.16-8.22L52.16-8.22L52.16-8.22Q53.38-6.78 56.06-6.78L56.06-6.78L56.06-6.78Q59.78-6.78 62.72-9.86L62.72-9.86L62.72-9.86Q63.55-10.82 64-11.90L64-11.90L64-11.90Q66.43-10.62 66.43-7.10L66.43-7.10L66.43-7.10Q66.43-3.52 62.46-1.15L62.46-1.15L62.46-1.15Q58.37 1.28 51.84 1.28L51.84 1.28L51.84 1.28Q38.85 1.28 38.85-12.48L38.85-12.48L38.85-12.48Q38.85-22.53 44.54-28.29L44.54-28.29L44.54-28.29Q50.05-33.92 60.16-33.92L60.16-33.92L60.16-33.92Q70.27-33.92 70.27-26.62ZM85.95 1.28L85.95 1.28L85.95 1.28Q71.87 1.28 71.87-11.97L71.87-11.97L71.87-11.97Q71.87-21.38 77.06-27.46L77.06-27.46L77.06-27.46Q82.56-33.92 92.10-33.92L92.10-33.92L92.10-33.92Q99.01-33.92 102.53-30.72L102.53-30.72L102.53-30.72Q106.05-27.52 106.05-20.80L106.05-20.80L106.05-20.80Q106.05-10.56 100.54-4.61L100.54-4.61L100.54-4.61Q95.17 1.28 85.95 1.28ZM87.62-26.56L87.62-26.56L87.62-26.56Q86.85-24.83 86.24-22.24L86.24-22.24L86.24-22.24Q85.63-19.65 84.86-15.55L84.86-15.55L84.86-15.55Q84.10-11.46 84.10-6.40L84.10-6.40L84.10-6.40Q84.10-4.74 84.64-3.65L84.64-3.65L84.64-3.65Q85.18-2.56 86.66-2.56L86.66-2.56L86.66-2.56Q88.13-2.56 89.06-3.26L89.06-3.26L89.06-3.26Q89.98-3.97 90.69-5.63L90.69-5.63L90.69-5.63Q91.97-8.58 92.99-14.05L92.99-14.05L92.99-14.05Q94.02-19.52 94.11-21.89L94.11-21.89L94.11-21.89Q94.21-24.26 94.21-26.02L94.21-26.02L94.21-26.02Q94.21-27.78 93.70-28.93L93.70-28.93L93.70-28.93Q93.18-30.08 91.74-30.08L91.74-30.08L91.74-30.08Q90.30-30.08 89.34-29.18L89.34-29.18L89.34-29.18Q88.38-28.29 87.62-26.56ZM129.86-17.98L129.86-17.98L129.86-17.98Q132.16-22.08 132.16-26.24L132.16-26.24L132.16-26.24Q132.16-28.99 130.18-28.99L130.18-28.99L130.18-28.99Q128.64-28.99 127.04-26.37L127.04-26.37L127.04-26.37Q125.38-23.74 124.86-20.35L124.86-20.35L121.54 0L108.29 1.28L114.82-32.64L125.38-33.92L124.22-27.46L124.22-27.46Q127.36-33.92 134.40-33.92L134.40-33.92L134.40-33.92Q138.11-33.92 140.13-32L140.13-32L140.13-32Q142.14-30.08 142.14-26.14L142.14-26.14L142.14-26.14Q142.14-22.21 139.55-19.71L139.55-19.71L139.55-19.71Q136.96-17.22 132.54-17.22L132.54-17.22L132.54-17.22Q130.62-17.22 129.86-17.98ZM158.53-3.52L158.53-3.52L158.53-3.52Q156.54 1.28 150.21 1.28L150.21 1.28L150.21 1.28Q146.94 1.28 144.90-0.96L144.90-0.96L144.90-0.96Q143.17-2.94 143.17-4.93L143.17-4.93L143.17-4.93Q143.17-10.11 145.54-20.22L145.54-20.22L147.90-32.64L160.90-33.92L156.99-13.70L156.99-13.70Q155.90-8.96 155.90-7.30L155.90-7.30L155.90-7.30Q155.90-3.65 158.53-3.52ZM149.06-41.54L149.06-41.54L149.06-41.54Q149.06-44.03 151.14-45.38L151.14-45.38L151.14-45.38Q153.22-46.72 156.22-46.72L156.22-46.72L156.22-46.72Q159.23-46.72 161.06-45.38L161.06-45.38L161.06-45.38Q162.88-44.03 162.88-41.54L162.88-41.54L162.88-41.54Q162.88-39.04 160.86-37.76L160.86-37.76L160.86-37.76Q158.85-36.48 155.84-36.48L155.84-36.48L155.84-36.48Q152.83-36.48 150.94-37.76L150.94-37.76L150.94-37.76Q149.06-39.04 149.06-41.54ZM189.89-10.82L189.89-10.82L189.89-10.82Q191.49-9.73 191.49-7.33L191.49-7.33L191.49-7.33Q191.49-4.93 190.27-3.39L190.27-3.39L190.27-3.39Q189.06-1.86 187.07-0.83L187.07-0.83L187.07-0.83Q182.98 1.28 178.56 1.28L178.56 1.28L178.56 1.28Q174.14 1.28 171.55 0.32L171.55 0.32L171.55 0.32Q168.96-0.64 167.23-2.43L167.23-2.43L167.23-2.43Q163.84-5.82 163.84-12.03L163.84-12.03L163.84-12.03Q163.84-21.70 169.09-27.58L169.09-27.58L169.09-27.58Q174.72-33.92 184.51-33.92L184.51-33.92L184.51-33.92Q190.59-33.92 193.60-31.36L193.60-31.36L193.60-31.36Q195.84-29.44 195.84-26.30L195.84-26.30L195.84-26.30Q195.84-15.04 176.38-15.04L176.38-15.04L176.38-15.04Q176.13-13.38 176.13-11.97L176.13-11.97L176.13-11.97Q176.13-9.02 177.44-7.90L177.44-7.90L177.44-7.90Q178.75-6.78 181.18-6.78L181.18-6.78L181.18-6.78Q183.62-6.78 186.21-7.90L186.21-7.90L186.21-7.90Q188.80-9.02 189.89-10.82ZM176.83-17.79L176.83-17.79L176.83-17.79Q181.38-17.79 184.00-20.61L184.00-20.61L184.00-20.61Q186.62-23.30 186.62-27.58L186.62-27.58L186.62-27.58Q186.62-29.06 186.08-29.86L186.08-29.86L186.08-29.86Q185.54-30.66 184.45-30.66L184.45-30.66L184.45-30.66Q183.36-30.66 182.43-30.24L182.43-30.24L182.43-30.24Q181.50-29.82 180.54-28.42L180.54-28.42L180.54-28.42Q178.18-25.22 176.83-17.79Z'
				/>
			</g>
		</g>
	</motion.svg>
);

export const AnimateLogo = () => (
	<motion.div
		className='z-[100] fullscreen flexcenter w-full bg-slate-900'
		initial={{ opacity: 0.95 }}
		animate={{
			opacity: 0,
			transitionEnd: {
				display: 'none',
			},
		}}
		transition={{
			default: { duration: 1, ease: 'easeInOut' },
			delay: 2,
		}}
	>
		<div className='absolute w-full h-full flexcenter'>
			<AnimateLogoBackground />
		</div>
		<div className='absolute w-full h-full flexcenter'>
			<AnimateLogoText />
		</div>
	</motion.div>
);