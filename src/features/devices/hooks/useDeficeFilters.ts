// import { useMemo, useState } from 'react';
// import type { Device, DeviceStatus } from '../types/device';

// type StatusFilter = 'all' | DeviceStatus;

// type UseDeviceFiltersResult = {
// 	searchTerm: string;
// 	statusFilter: StatusFilter;
// 	setSearchTerm: (value: string) => void;
// 	setStatusFilter: (value: StatusFilter) => void;
// 	filteredDevices: Device[];
// };

// export function useDeviceFilters(devices: Device[]): UseDeviceFiltersResult {
// 	const [searchTerm, setSearchTerm] = useState<string>('');
// 	const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

// 	const filteredDevices = useMemo(() => {
// 		const normalizedSearch = searchTerm.trim().toLowerCase();

// 		return devices.filter((device) => {
// 			const matchesSearch =
// 				normalizedSearch.length === 0 ||
// 				device.name.toLowerCase().includes(normalizedSearch) ||
// 				device.model.toLowerCase().includes(normalizedSearch) ||
// 				device.deviceType.toLowerCase().includes(normalizedSearch) ||
// 				device.assignedRadiosondeModel.toLowerCase().includes(normalizedSearch);

// 			const matchesStatus =
// 				statusFilter === 'all' || device.status === statusFilter;

// 			return matchesSearch && matchesStatus;
// 		});
// 	}, [devices, searchTerm, statusFilter]);

// 	return {
// 		searchTerm,
// 		statusFilter,
// 		setSearchTerm,
// 		setStatusFilter,
// 		filteredDevices,
// 	};
// }
// import { useMemo, useState } from 'react';
// import type { Device, DeviceStatus } from '../types/device';

// type UseDeviceFiltersResult = {
// 	searchTerm: string;
// 	selectedStatuses: DeviceStatus[];
// 	setSearchTerm: (value: string) => void;
// 	toggleStatus: (status: DeviceStatus) => void;
// 	clearStatuses: () => void;
// 	filteredDevices: Device[];
// };

// export function useDeviceFilters(devices: Device[]): UseDeviceFiltersResult {
// 	const [searchTerm, setSearchTerm] = useState<string>('');
// 	const [selectedStatuses, setSelectedStatuses] = useState<DeviceStatus[]>([]);

// 	const toggleStatus = (status: DeviceStatus) => {
// 		setSelectedStatuses((previousStatuses) => {
// 			console.log(previousStatuses);
// 			return previousStatuses.includes(status)
// 				? previousStatuses.filter((item) => item !== status)
// 				: [...previousStatuses, status];
// 		});
// 	};

// 	const clearStatuses = () => {
// 		setSelectedStatuses([]);
// 	};

// 	const filteredDevices = useMemo(() => {
// 		const normalizedSearch = searchTerm.trim().toLowerCase();

// 		return devices.filter((device) => {
// 			const matchesSearch =
// 				normalizedSearch.length === 0 ||
// 				device.name.toLowerCase().includes(normalizedSearch) ||
// 				device.model.toLowerCase().includes(normalizedSearch) ||
// 				device.deviceType.toLowerCase().includes(normalizedSearch) ||
// 				device.assignedRadiosondeModel.toLowerCase().includes(normalizedSearch);

// 			const matchesStatus =
// 				selectedStatuses.length === 0 ||
// 				selectedStatuses.includes(device.status);

// 			return matchesSearch && matchesStatus;
// 		});
// 	}, [devices, searchTerm, selectedStatuses]);

// 	return {
// 		searchTerm,
// 		selectedStatuses,
// 		setSearchTerm,
// 		toggleStatus,
// 		clearStatuses,
// 		filteredDevices,
// 	};
// }

// import { useMemo, useState } from 'react';
// import type { Device, DeviceStatus } from '../types/device';

// type SortOption = 'name-asc' | 'signal-desc' | 'signal-asc' | 'last-seen-desc';

// type UseDeviceFiltersResult = {
// 	searchTerm: string;
// 	selectedStatuses: DeviceStatus[];
// 	sortOption: SortOption;
// 	setSearchTerm: (value: string) => void;
// 	toggleStatus: (status: DeviceStatus) => void;
// 	clearStatuses: () => void;
// 	setSortOption: (value: SortOption) => void;
// 	filteredDevices: Device[];
// };

// export function useDeviceFilters(devices: Device[]): UseDeviceFiltersResult {
// 	const [searchTerm, setSearchTerm] = useState<string>('');
// 	const [selectedStatuses, setSelectedStatuses] = useState<DeviceStatus[]>([]);
// 	const [sortOption, setSortOption] = useState<SortOption>('name-asc');

// 	const toggleStatus = (status: DeviceStatus) => {
// 		setSelectedStatuses((previousStatuses) =>
// 			previousStatuses.includes(status)
// 				? previousStatuses.filter((item) => item !== status)
// 				: [...previousStatuses, status],
// 		);
// 	};

// 	const clearStatuses = () => {
// 		setSelectedStatuses([]);
// 	};

// 	const filteredDevices = useMemo(() => {
// 		const normalizedSearch = searchTerm.trim().toLowerCase();

// 		const filtered = devices.filter((device) => {
// 			const matchesSearch =
// 				normalizedSearch.length === 0 ||
// 				device.name.toLowerCase().includes(normalizedSearch) ||
// 				device.model.toLowerCase().includes(normalizedSearch) ||
// 				device.deviceType.toLowerCase().includes(normalizedSearch) ||
// 				device.assignedRadiosondeModel.toLowerCase().includes(normalizedSearch);

// 			const matchesStatus =
// 				selectedStatuses.length === 0 ||
// 				selectedStatuses.includes(device.status);

// 			return matchesSearch && matchesStatus;
// 		});

// 		const sorted = [...filtered].sort((firstDevice, secondDevice) => {
// 			switch (sortOption) {
// 				case 'signal-desc':
// 					return secondDevice.signalQuality - firstDevice.signalQuality;

// 				case 'signal-asc':
// 					return firstDevice.signalQuality - secondDevice.signalQuality;

// 				case 'last-seen-desc':
// 					return (
// 						new Date(secondDevice.lastSeen).getTime() -
// 						new Date(firstDevice.lastSeen).getTime()
// 					);

// 				case 'name-asc':
// 				default:
// 					return firstDevice.name.localeCompare(secondDevice.name);
// 			}
// 		});

// 		return sorted;
// 	}, [devices, searchTerm, selectedStatuses, sortOption]);

// 	return {
// 		searchTerm,
// 		selectedStatuses,
// 		sortOption,
// 		setSearchTerm,
// 		toggleStatus,
// 		clearStatuses,
// 		setSortOption,
// 		filteredDevices,
// 	};
// }

import { useMemo, useState } from 'react';
import type { Device, DeviceStatus } from '../types/device';

type SortOption = 'name-asc' | 'signal-desc' | 'signal-asc' | 'last-seen-desc';

type UseDeviceFiltersResult = {
	searchTerm: string;
	selectedStatuses: DeviceStatus[];
	sortOption: SortOption;
	setSearchTerm: (value: string) => void;
	toggleStatus: (status: DeviceStatus) => void;
	clearStatuses: () => void;
	setSortOption: (value: SortOption) => void;
	filteredDevices: Device[];
};

export function useDeviceFilters(devices: Device[]): UseDeviceFiltersResult {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedStatuses, setSelectedStatuses] = useState<DeviceStatus[]>([]);
	const [sortOption, setSortOption] = useState<SortOption>('name-asc');

	const toggleStatus = (status: DeviceStatus) => {
		setSelectedStatuses((previousStatuses) =>
			previousStatuses.includes(status)
				? previousStatuses.filter((item) => item !== status)
				: [...previousStatuses, status],
		);
	};

	const clearStatuses = () => {
		setSelectedStatuses([]);
	};

	const filteredDevices = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		const filtered = devices.filter((device) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				device.name.toLowerCase().includes(normalizedSearch) ||
				device.model.toLowerCase().includes(normalizedSearch) ||
				device.deviceType.toLowerCase().includes(normalizedSearch) ||
				device.assignedRadiosondeModel.toLowerCase().includes(normalizedSearch);

			const matchesStatus =
				selectedStatuses.length === 0 ||
				selectedStatuses.includes(device.status);

			return matchesSearch && matchesStatus;
		});

		const sorted = [...filtered].sort((firstDevice, secondDevice) => {
			switch (sortOption) {
				case 'signal-desc':
					return secondDevice.signalQuality - firstDevice.signalQuality;

				case 'signal-asc':
					return firstDevice.signalQuality - secondDevice.signalQuality;

				case 'last-seen-desc':
					return (
						new Date(secondDevice.lastSeen).getTime() -
						new Date(firstDevice.lastSeen).getTime()
					);

				case 'name-asc':
				default:
					return firstDevice.name.localeCompare(secondDevice.name);
			}
		});

		return sorted;
	}, [devices, searchTerm, selectedStatuses, sortOption]);

	return {
		searchTerm,
		selectedStatuses,
		sortOption,
		setSearchTerm,
		toggleStatus,
		clearStatuses,
		setSortOption,
		filteredDevices,
	};
}
