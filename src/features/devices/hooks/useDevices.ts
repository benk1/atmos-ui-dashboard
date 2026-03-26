// import { useEffect, useState } from 'react';
// import { getDevices } from '../services/devicesService';
// import type { Device } from '../types/device';

// type UseDevicesResult = {
// 	devices: Device[];
// 	isLoading: boolean;
// 	error: string | null;
// };

// export function useDevices(): UseDevicesResult {
// 	const [devices, setDevices] = useState<Device[]>([]);
// 	const [isLoading, setIsLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchDevices = async () => {
// 			try {
// 				setIsLoading(true);
// 				setError(null);

// 				const data = await getDevices();
// 				setDevices(data);
// 			} catch (err) {
// 				setError('Failed to load devices. Please try again.');
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		void fetchDevices();
// 	}, []);

// 	return {
// 		devices,
// 		isLoading,
// 		error,
// 	};
// }

import { useFetch } from '../../../hooks/useFetch';
import { getDevices } from '../services/devicesService';
import type { Device } from '../types/device';

type UseDevicesResult = {
	devices: Device[];
	isLoading: boolean;
	error: string | null;
};

export function useDevices(): UseDevicesResult {
	const { data, isLoading, error } = useFetch<Device>(
		getDevices,
		'Failed to load devices. Please try again.',
	);

	return {
		devices: data,
		isLoading,
		error,
	};
}