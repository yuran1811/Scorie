import { auth, db } from 'shared';
import { getFirebaseErr } from 'utils';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, User } from 'firebase/auth';

export const sendVerifyEmail = async (user: User) => {
	try {
		await sendEmailVerification(user);

		return 'Email verification sent !';
	} catch (error) {
		const err = error as FirebaseError;
		return `Cannot send email verification !\n${getFirebaseErr(err.message)}`;
	}
};

export const createNewUserEmailMethod = async (email: string, password: string) => {
	try {
		const resp = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());

		return {
			resp,
			errorMessage: 'Create user successfully !',
		};
	} catch (error) {
		const err = error as FirebaseError;
		return {
			resp: null,
			errorMessage: `Cannot create user !\n${getFirebaseErr(err.message)}`,
		};
	}
};

export const updateUserProfile = async (user: User) => {
	try {
		await setDoc(
			doc(db, 'users', user.uid),
			{
				uid: user.uid,
				photoURL: user.photoURL,
				displayName: user.displayName,
				email: user.email,
			},
			{ merge: true }
		);

		return '';
	} catch (error) {
		const err = error as FirebaseError;
		return getFirebaseErr(err.message);
	}
};

export const updateProfileEmailMethod = async (
	user: User,
	data: {
		displayName?: string | null | undefined;
		photoURL?: string | null | undefined;
	}
) => {
	try {
		const resp = await updateProfile(user, data);

		return {
			resp,
			errorMessage: 'Updated !',
		};
	} catch (error) {
		const err = error as FirebaseError;
		return {
			resp: null,
			errorMessage: `Cannot update user profile !\n${getFirebaseErr(err.message)}`,
		};
	}
};
