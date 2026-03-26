import type { JSX } from 'react';

type LoadingStateProps = {
	message?: string;
};

export default function LoadingState({
	message = 'Loading...',
}: LoadingStateProps): JSX.Element {
	return (
		<div className="panel" role="status" aria-live="polite">
			<p>{message}</p>
		</div>
	);
}
