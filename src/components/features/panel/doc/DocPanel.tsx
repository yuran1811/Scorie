import { DivProps } from 'shared';
import { usePanel } from 'contexts';
import { BackIcon } from 'components/icons';
import { DocInfo } from './DocInfo';
import { FC } from 'react';

const DocPanel: FC<DivProps> = ({ className }) => {
	const { active, setActive } = usePanel();

	return (
		<div
			className={`${className || ''} ${
				active.isDoc ? 'translate-x-0' : 'translate-x-[-200%]'
			} z-20 isAnimated fullscreen px-4 mobile:px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
		>
			<BackIcon
				onClick={() =>
					setActive &&
					setActive((s) => ({
						...s,
						isDoc: false,
					}))
				}
			/>

			<DocInfo />
		</div>
	);
};

export default DocPanel;
