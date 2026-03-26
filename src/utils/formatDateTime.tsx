export function formatDateTime(value: string): string {
	const date = new Date(value);

	return new Intl.DateTimeFormat('en-GB', {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(date);
}
