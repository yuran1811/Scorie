import { fakeNotes, fakeNotesProps, fakeScores, fakeScoresProps } from './index';

export interface FakeUserDataType {
	email: string;
	password: string;
}

export interface RSADataType {
	publicKey: CryptoKey | null;
	privateKey: CryptoKey | null;
	cipherText: BufferSource | null;
}

export type RSAEncryptFuncType = (data: string) => Promise<any> | string;
export type RSADecryptFuncType = (data: BufferSource) => Promise<any> | string;

export const RSAData: RSADataType = {
	publicKey: null,
	privateKey: null,
	cipherText: null,
};

export let encryptData: RSAEncryptFuncType | null = null;
export let decryptData: RSADecryptFuncType | null = null;

(() => {
	crypto.subtle
		.generateKey(
			{
				hash: 'SHA-256',
				name: 'RSA-OAEP',
				modulusLength: 2048,
				publicExponent: new Uint8Array([1, 0, 1]),
			},
			true,
			['encrypt', 'decrypt']
		)
		.then(({ publicKey, privateKey }) => {
			RSAData.publicKey = publicKey;
			RSAData.privateKey = privateKey;

			encryptData = (data: string) => {
				if (RSAData.publicKey !== null)
					return crypto.subtle.encrypt(
						{
							name: 'RSA-OAEP',
						},
						RSAData.publicKey,
						new TextEncoder().encode(data)
					);

				return '';
			};

			decryptData = (data: BufferSource) => {
				if (RSAData.privateKey !== null && data !== null)
					return crypto.subtle.decrypt(
						{
							name: 'RSA-OAEP',
						},
						RSAData.privateKey,
						data
					);

				return '';
			};
		});
})();

export interface fakeUserProps {
	name: string;
	email: string;
	password: string;
	hashEmail: string;
	hashPassword: string;
	scores: fakeScoresProps[];
	notes: fakeNotesProps[];
}

export const fakeUser: fakeUserProps[] = [
	{
		name: 'admin',
		email: 'admin@gmail.com',
		password: '123456',
		hashEmail: '',
		hashPassword: '',
		scores: fakeScores,
		notes: fakeNotes,
	},
	{
		name: 'Test User 1',
		email: 'a@gmail.com',
		password: '123456',
		hashEmail: '',
		hashPassword: '',
		scores: [],
		notes: [],
	},
];

export const hashFakeUserData = async (data: FakeUserDataType) => {
	if (encryptData) {
		fakeUser[0].hashEmail = await encryptData(fakeUser[0].email);
		fakeUser[0].hashPassword = await encryptData(fakeUser[0].password);
	}
};

export const validateFakeUserData = (data: FakeUserDataType) => {
	// if (decryptData) decryptData(fakeUser[0].hashEmail).then(console.log);
	const user = fakeUser.find((user) => user.email === data.email && user.password === data.password);

	if (user)
		return {
			name: user.name,
			isAuth: true,
			errorMessage: '',
			data: {
				scores: user.scores || [],
				notes: user.notes || [],
			},
		};

	return {
		name: '',
		isAuth: false,
		errorMessage: 'Wrong email or password. Please check your account info !',
		data: {
			scores: [],
			notes: [],
		},
	};
};
