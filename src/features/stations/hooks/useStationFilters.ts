import { useMemo, useState } from 'react';
import type { LaunchMode, Station, StationStatus } from '../types/station';

type SortOption =
	| 'name-asc'
	| 'name-desc'
	| 'altitude-desc'
	| 'last-maintenance-desc';

type LaunchModeFilter = 'all' | LaunchMode;

type UseStationFiltersResult = {
	searchTerm: string;
	selectedStatuses: StationStatus[];
	launchModeFilter: LaunchModeFilter;
	sortOption: SortOption;
	setSearchTerm: (value: string) => void;
	toggleStatus: (status: StationStatus) => void;
	clearStatuses: () => void;
	setLaunchModeFilter: (value: LaunchModeFilter) => void;
	setSortOption: (value: SortOption) => void;
	filteredStations: Station[];
};

export function useStationFilters(
	stations: Station[],
): UseStationFiltersResult {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedStatuses, setSelectedStatuses] = useState<StationStatus[]>([]);
	const [launchModeFilter, setLaunchModeFilter] =
		useState<LaunchModeFilter>('all');
	const [sortOption, setSortOption] = useState<SortOption>('name-asc');

	const toggleStatus = (status: StationStatus) => {
		setSelectedStatuses((previousStatuses) =>
			previousStatuses.includes(status)
				? previousStatuses.filter((item) => item !== status)
				: [...previousStatuses, status],
		);
	};

	const clearStatuses = () => {
		setSelectedStatuses([]);
	};

	const filteredStations = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		const filtered = stations.filter((station) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				station.name.toLowerCase().includes(normalizedSearch) ||
				station.city.toLowerCase().includes(normalizedSearch) ||
				station.stationCode.toLowerCase().includes(normalizedSearch) ||
				station.systemType.toLowerCase().includes(normalizedSearch);

			const matchesStatus =
				selectedStatuses.length === 0 ||
				selectedStatuses.includes(station.status);

			const matchesLaunchMode =
				launchModeFilter === 'all' || station.launchMode === launchModeFilter;

			return matchesSearch && matchesStatus && matchesLaunchMode;
		});

		const sorted = [...filtered].sort((firstStation, secondStation) => {
			switch (sortOption) {
				case 'name-desc':
					return secondStation.name.localeCompare(firstStation.name);

				case 'altitude-desc':
					return secondStation.altitudeMeters - firstStation.altitudeMeters;

				case 'last-maintenance-desc':
					return (
						new Date(secondStation.lastMaintenance).getTime() -
						new Date(firstStation.lastMaintenance).getTime()
					);

				case 'name-asc':
				default:
					return firstStation.name.localeCompare(secondStation.name);
			}
		});

		return sorted;
	}, [stations, searchTerm, selectedStatuses, launchModeFilter, sortOption]);

	return {
		searchTerm,
		selectedStatuses,
		launchModeFilter,
		sortOption,
		setSearchTerm,
		toggleStatus,
		clearStatuses,
		setLaunchModeFilter,
		setSortOption,
		filteredStations,
	};
}
