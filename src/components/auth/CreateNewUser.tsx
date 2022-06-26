import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FC, useEffect } from 'react';

interface UserType {
	email: string;
	password: string;
}

const CreateNewUser: FC<UserType> = ({ email, password }) => {
	const auth = getAuth();

	useEffect(() => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	}, []);

	return <div>CreateNewUser</div>;
};

export default CreateNewUser;
