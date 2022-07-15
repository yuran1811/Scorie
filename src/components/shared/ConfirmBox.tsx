import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { DivProps } from 'shared';
import { Button } from './Button';

interface ConfirmBoxProps {
	content?: string;
	actionWhenConfirm: () => Promise<any>;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmBox: FC<ConfirmBoxProps & DivProps> = ({
	className,
	content,
	setConfirm,
	actionWhenConfirm,
	...otherProps
}) => {
	return createPortal(
		<div
			{...otherProps}
			className={`${
				className || ''
			} isAnimated origin-top absolute bottom-0 left-0 right-0 p-2 flexcenter flex-wrap bg-ctcolor`}
			onClick={(e) => e.stopPropagation()}
		>
			<div>
				<div className='font-bold text-[3rem] tablet:text-[3.4rem] text-center text-ctbg p-4 mb-4'>
					{content || 'Confirm action ?'}
				</div>
				<div className='flexcenter flex-wrap'>
					<Button
						className='!text-[3rem]'
						content='Cancel'
						onClick={() => {
							setConfirm(false);
						}}
					/>
					<Button
						className='!text-[3rem]'
						content='Confirm'
						onClick={() => {
							actionWhenConfirm().finally(() => {
								setConfirm(false);
							});
						}}
					/>
				</div>
			</div>
		</div>,
		document.getElementById('confirm-container') as HTMLElement
	);
};
