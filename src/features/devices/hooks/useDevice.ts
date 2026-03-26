import { useCallback } from 'react';
import { useFetchItem } from '../../../hooks/useFetchItem';
import { getDeviceById } from '../services/devicesService';
import type { Device } from '../types/device';

type UseDeviceResult = {
	device: Device | null;
	isLoading: boolean;
	error: string | null;
};

export function useDevice(id: number | null): UseDeviceResult {
	const isValidId = id !== null;

	const fetchDevice = useCallback(() => {
		return getDeviceById(id as number);
	}, [id]);

	const { data, isLoading, error } = useFetchItem<Device>(
		fetchDevice,
		'Failed to load device details.',
		isValidId,
	);

	return {
		device: data,
		isLoading,
		error: !isValidId ? 'Invalid device id.' : error,
	};
}
