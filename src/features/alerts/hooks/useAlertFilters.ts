import { useMemo, useState } from 'react';
import type { Alert, AlertSeverity } from '../types/alert';

type ResolutionFilter = 'all' | 'open' | 'resolved';

type SortOption = 'created-desc' | 'severity-desc' | 'code-asc';

type UseAlertFiltersResult = {
	searchTerm: string;
	selectedSeverities: AlertSeverity[];
	resolutionFilter: ResolutionFilter;
	sortOption: SortOption;
	setSearchTerm: (value: string) => void;
	toggleSeverity: (severity: AlertSeverity) => void;
	clearSeverities: () => void;
	setResolutionFilter: (value: ResolutionFilter) => void;
	setSortOption: (value: SortOption) => void;
	filteredAlerts: Alert[];
};

function getSeverityRank(severity: AlertSeverity): number {
	switch (severity) {
		case 'critical':
			return 3;
		case 'warning':
			return 2;
		case 'info':
		default:
			return 1;
	}
}

export function useAlertFilters(alerts: Alert[]): UseAlertFiltersResult {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedSeverities, setSelectedSeverities] = useState<AlertSeverity[]>(
		[],
	);
	const [resolutionFilter, setResolutionFilter] =
		useState<ResolutionFilter>('all');
	const [sortOption, setSortOption] = useState<SortOption>('created-desc');

	const toggleSeverity = (severity: AlertSeverity) => {
		setSelectedSeverities((previousSeverities) =>
			previousSeverities.includes(severity)
				? previousSeverities.filter((item) => item !== severity)
				: [...previousSeverities, severity],
		);
	};

	const clearSeverities = () => {
		setSelectedSeverities([]);
	};

	const filteredAlerts = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		const filtered = alerts.filter((alert) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				alert.code.toLowerCase().includes(normalizedSearch) ||
				alert.message.toLowerCase().includes(normalizedSearch);

			const matchesSeverity =
				selectedSeverities.length === 0 ||
				selectedSeverities.includes(alert.severity);

			const matchesResolution =
				resolutionFilter === 'all' ||
				(resolutionFilter === 'resolved' && alert.resolved) ||
				(resolutionFilter === 'open' && !alert.resolved);

			return matchesSearch && matchesSeverity && matchesResolution;
		});

		const sorted = [...filtered].sort((firstAlert, secondAlert) => {
			switch (sortOption) {
				case 'severity-desc':
					return (
						getSeverityRank(secondAlert.severity) -
						getSeverityRank(firstAlert.severity)
					);

				case 'code-asc':
					return firstAlert.code.localeCompare(secondAlert.code);

				case 'created-desc':
				default:
					return (
						new Date(secondAlert.createdAt).getTime() -
						new Date(firstAlert.createdAt).getTime()
					);
			}
		});

		return sorted;
	}, [alerts, searchTerm, selectedSeverities, resolutionFilter, sortOption]);

	return {
		searchTerm,
		selectedSeverities,
		resolutionFilter,
		sortOption,
		setSearchTerm,
		toggleSeverity,
		clearSeverities,
		setResolutionFilter,
		setSortOption,
		filteredAlerts,
	};
}
