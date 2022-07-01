import { DocInfo } from './DocInfo';
import { BackIcon } from 'components/icons';
import { useMenu, useDocPanel } from 'contexts';
import { FC, HTMLProps, useEffect } from 'react';

const DocPanel: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
	const { active: menuActive } = useMenu();
	const { active, setActive } = useDocPanel();

	useEffect(() => {
		setActive && setActive(false);
	}, [menuActive]);

	return (
		<div
			className={`${className || ''} ${
				active ? 'translate-x-0' : 'translate-x-[-200%]'
			} z-20 isAnimated fullscreen px-4 mobile:px-12 py-20 tablet:max-w-[50rem] bg-ctcolor text-ctbg`}
		>
			<BackIcon onClick={() => setActive && setActive(false)} />

			<DocInfo />
		</div>
	);
};

export default DocPanel;
