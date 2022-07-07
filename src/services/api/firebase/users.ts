import { auth, db } from 'shared';
import { getFirebaseErr } from 'utils';
import { FirebaseError } from 'firebase/app';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
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
		const authUser = auth.currentUser;
		if (authUser === null) return;

		await updateProfile(authUser, { ...user });
		await updateDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			photoURL: user.photoURL,
			displayName: user.displayName,
			updatedAt: serverTimestamp(),
		});

		return {
			errorMessage: '',
		};
	} catch (error) {
		const err = error as FirebaseError;
		return {
			errorMessage: getFirebaseErr(err.message),
		};
	}
};

export const setUserProfile = async (user: User) => {
	try {
		await setDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			photoURL: user.photoURL,
			displayName: user.displayName,
			updatedAt: serverTimestamp(),
		});

		return {
			errorMessage: '',
		};
	} catch (error) {
		const err = error as FirebaseError;
		return {
			errorMessage: getFirebaseErr(err.message),
		};
	}
};
