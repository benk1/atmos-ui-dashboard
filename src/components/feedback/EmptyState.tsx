import type { JSX } from 'react';

type EmptyStateProps = {
	message: string;
};

export default function EmptyState({ message }: EmptyStateProps): JSX.Element {
	return (
		<div className="panel">
			<p>{message}</p>
		</div>
	);
}
