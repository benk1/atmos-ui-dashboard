import { useEffect, useState } from 'react';

type UseFetchResult<T> = {
	data: T[];
	isLoading: boolean;
	error: string | null;
};

export function useFetch<T>(
	fetcher: () => Promise<T[]>,
	errorMessage = 'Failed to load data.',
): UseFetchResult<T> {
	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const result = await fetcher();
				setData(result);
			} catch {
				setError(errorMessage);
			} finally {
				setIsLoading(false);
			}
		};

		void fetchData();
	}, [fetcher, errorMessage]);

	return {
		data,
		isLoading,
		error,
	};
}
