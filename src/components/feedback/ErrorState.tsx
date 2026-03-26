import type { JSX } from 'react';

type ErrorStateProps = {
	message: string;
};

export default function ErrorState({ message }: ErrorStateProps): JSX.Element {
	return (
		<div className="panel" role="alert">
			<p>{message}</p>
		</div>
	);
}
