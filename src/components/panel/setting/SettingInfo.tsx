import { DownloadIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input } from 'components/shared';
import { FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useStore } from 'store';
import { SETTINGS_DEFAULT_TYPE } from '../../../constants';

export const SettingInfo: FC = () => {
	const settings = useStore((s) => s.settings);
	const setSettings = useStore((s) => s.setSettings);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SETTINGS_DEFAULT_TYPE>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<SETTINGS_DEFAULT_TYPE> = useCallback((data) => {
		setSettings({ ...data });
	}, []);

	return (
		<div className='flexcentercol !justify-start mt-[2rem] p-3 pb-8 w-full h-[80%] overflow-x-hidden overflow-y-auto'>
			<div className='flexcenter w-full'>
				<Button className='!text-[3.5rem]' content='Store data'>
					<DownloadIcon className='m-4' width='50' height='50' />
				</Button>
			</div>

			<div className='w-full'>
				<form className='mt-[2rem] flexcentercol' onSubmit={handleSubmit(onSubmit)}>
					<span className='font-bold text-[3.8rem] text-center'>Score Format (9.xxxx)</span>
					<Input
						placeholder='Type a number'
						defaultValue={settings.numberFormat}
						formHandle={{ ...register('numberFormat', { required: true, pattern: /^\d+$/ }) }}
					/>
					{errors?.numberFormat && <ErrorMessage extraStyle='text-[3rem]' content='Invalid number' />}

					<Button className='!text-[3.5rem]' content='Change' onClick={handleSubmit(onSubmit)} />
				</form>
			</div>
		</div>
	);
};
