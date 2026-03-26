import { useEffect, useState } from 'react';
import { getDeviceById } from '../services/devicesService';
import type { Device } from '../types/device';

type UseDeviceResult = {
	device: Device | null;
	isLoading: boolean;
	error: string | null;
};

export function useDevice(id: number | null): UseDeviceResult {
	const [device, setDevice] = useState<Device | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id === null) {
			setDevice(null);
			setError('Invalid device id.');
			setIsLoading(false);
			return;
		}

		const fetchDevice = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const data = await getDeviceById(id);
				setDevice(data);
			} catch {
				setError('Failed to load device details.');
				setDevice(null);
			} finally {
				setIsLoading(false);
			}
		};

		void fetchDevice();
	}, [id]);

	return {
		device,
		isLoading,
		error,
	};
}
