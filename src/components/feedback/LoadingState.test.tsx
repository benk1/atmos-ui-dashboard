import { render, screen } from '@testing-library/react';
import LoadingState from './LoadingState';

describe('LoadingState', () => {
	it('renders the default loading message', () => {
		render(<LoadingState />);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders a custom loading message', () => {
		render(<LoadingState message="Loading devices..." />);

		expect(screen.getByText('Loading devices...')).toBeInTheDocument();
	});

	it('renders a status role for accessibility', () => {
		render(<LoadingState message="Loading devices..." />);

		expect(screen.getByRole('status')).toBeInTheDocument();
	});
});
