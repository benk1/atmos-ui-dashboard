import { useMemo, useState } from 'react';
import type { Sounding, SoundingStatus } from '../types/sounding';

type SortOption =
	| 'start-time-desc'
	| 'quality-desc'
	| 'altitude-desc'
	| 'sounding-number-asc';

type UseSoundingFiltersResult = {
	searchTerm: string;
	selectedStatuses: SoundingStatus[];
	sortOption: SortOption;
	setSearchTerm: (value: string) => void;
	toggleStatus: (status: SoundingStatus) => void;
	clearStatuses: () => void;
	setSortOption: (value: SortOption) => void;
	filteredSoundings: Sounding[];
};

export function useSoundingFilters(
	soundings: Sounding[],
): UseSoundingFiltersResult {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedStatuses, setSelectedStatuses] = useState<SoundingStatus[]>(
		[],
	);
	const [sortOption, setSortOption] = useState<SortOption>('start-time-desc');

	const toggleStatus = (status: SoundingStatus) => {
		setSelectedStatuses((previousStatuses) =>
			previousStatuses.includes(status)
				? previousStatuses.filter((item) => item !== status)
				: [...previousStatuses, status],
		);
	};

	const clearStatuses = () => {
		setSelectedStatuses([]);
	};

	const filteredSoundings = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		const filtered = soundings.filter((sounding) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				sounding.soundingNumber.toLowerCase().includes(normalizedSearch) ||
				sounding.operator.toLowerCase().includes(normalizedSearch) ||
				sounding.radiosondeModel.toLowerCase().includes(normalizedSearch);

			const matchesStatus =
				selectedStatuses.length === 0 ||
				selectedStatuses.includes(sounding.status);

			return matchesSearch && matchesStatus;
		});

		const sorted = [...filtered].sort((firstSounding, secondSounding) => {
			switch (sortOption) {
				case 'quality-desc':
					return (
						(secondSounding.qualityScore ?? -1) -
						(firstSounding.qualityScore ?? -1)
					);

				case 'altitude-desc':
					return (
						secondSounding.maxAltitudeMeters - firstSounding.maxAltitudeMeters
					);

				case 'sounding-number-asc':
					return firstSounding.soundingNumber.localeCompare(
						secondSounding.soundingNumber,
					);

				case 'start-time-desc':
				default:
					return (
						new Date(secondSounding.startTime).getTime() -
						new Date(firstSounding.startTime).getTime()
					);
			}
		});

		return sorted;
	}, [soundings, searchTerm, selectedStatuses, sortOption]);

	return {
		searchTerm,
		selectedStatuses,
		sortOption,
		setSearchTerm,
		toggleStatus,
		clearStatuses,
		setSortOption,
		filteredSoundings,
	};
}
