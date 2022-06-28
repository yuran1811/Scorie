import { DownloadIcon } from 'components/icons';
import { ErrorMessage } from 'components/interfaces';
import { Button, Input } from 'components/shared';
import { useLocalStore } from 'hooks';
import { FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SETTINGS_DEFAULT, SETTINGS_DEFAULT_Props } from '../../../constants';

export const SettingInfo: FC = () => {
	const [localSetting, setLocalSetting] = useLocalStore<SETTINGS_DEFAULT_Props>(
		'settings',
		{ ...SETTINGS_DEFAULT },
		'{}'
	);

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SETTINGS_DEFAULT_Props>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<SETTINGS_DEFAULT_Props> = useCallback((data) => {
		setLocalSetting({ ...localSetting, numberFormat: watch('numberFormat') });
	}, []);

	return (
		<div className='flexcentercol !justify-start mt-[2rem] p-3 pb-8 w-full h-[80%] overflow-x-hidden overflow-y-auto'>
			<div className='flexcenter w-full'>
				<Button className='!text-[3.5rem]' content='Create backup data'>
					<DownloadIcon className='m-4' width='50' height='50' />
				</Button>
			</div>

			<div className='w-full'>
				<form className='mt-[2rem] flexcentercol' onSubmit={handleSubmit(onSubmit)}>
					<span className='font-bold text-[3.8rem] text-center'>Score Format (9.xxxx)</span>
					<Input
						placeholder='Type a number'
						defaultValue={localSetting.numberFormat}
						formHandle={{ ...register('numberFormat', { required: true, pattern: /^\d+$/ }) }}
					/>
					{errors?.numberFormat && <ErrorMessage extraStyle='text-[3rem]' content='Invalid number' />}

					<Button className='!text-[3.5rem]' content='Change' onClick={handleSubmit(onSubmit)} />
				</form>
			</div>
		</div>
	);
};
