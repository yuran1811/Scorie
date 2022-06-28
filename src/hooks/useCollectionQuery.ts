import { CollectionReference, DocumentData, onSnapshot, Query, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const CACHE: { [key: string]: any } = {};

type useCollectionQueryType = (
	key: string,
	collection: CollectionReference | Query<DocumentData>
) => { loading: boolean; error: boolean; data: QuerySnapshot | null };

export const useCollectionQuery: useCollectionQueryType = (key, collection) => {
	const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(CACHE[key] || null);
	const [loading, setLoading] = useState(!data);
	const [error, setError] = useState(false);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection,
			(snapshot) => {
				setLoading(false);
				setData(snapshot);
				setError(false);

				CACHE[key] = snapshot;
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
