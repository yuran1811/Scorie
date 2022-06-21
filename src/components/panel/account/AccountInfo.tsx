import { AUTH_CONTEXT_DEFAULT } from '../../../constants';
import { Button } from 'components/shared';
import { useAuth } from 'contexts';
import { FC } from 'react';

export const AccountInfo: FC = () => {
	const { auth, setAuth } = useAuth();

	return (
		<div className='flexcentercol mt-[2rem] p-3'>
			<div>{auth.email}</div>

			<Button content='Log out' onClick={() => setAuth && setAuth(AUTH_CONTEXT_DEFAULT)} />
			{/* <Button content='Change password' /> */}
		</div>
	);
};
