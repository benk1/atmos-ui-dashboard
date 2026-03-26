import { useEffect, useState } from 'react';

type UseFetchItemResult<T> = {
	data: T | null;
	isLoading: boolean;
	error: string | null;
};

export function useFetchItem<T>(
	fetcher: () => Promise<T>,
	errorMessage = 'Failed to load item.',
	enabled = true,
): UseFetchItemResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!enabled) {
			setData(null);
			setError(null);
			setIsLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const result = await fetcher();
				setData(result);
			} catch {
				setError(errorMessage);
				setData(null);
			} finally {
				setIsLoading(false);
			}
		};

		void fetchData();
	}, [fetcher, errorMessage, enabled]);

	return {
		data,
		isLoading,
		error,
	};
}
