import { DocumentData, DocumentReference, DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const CACHE: { [key: string]: any } = {};

export const useDocumentQuery = (key: string, document: DocumentReference<DocumentData>) => {
	const [data, setData] = useState<DocumentSnapshot<DocumentData> | null>(CACHE[key] || null);
	const [loading, setLoading] = useState(!Boolean(data));
	const [error, setError] = useState(false);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			document,
			(snapshot) => {
				setLoading(false);
				setData(snapshot);
			},
			(err) => {
				console.log(err);
				setLoading(false);
				setData(null);
				setError(true);
			}
		);

		return () => unsubscribe();
	}, [key]);

	return { loading, error, data };
};
