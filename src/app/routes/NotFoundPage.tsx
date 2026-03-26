import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage(): JSX.Element {
	return (
		<section className="page-section" aria-labelledby="not-found-title">
			<div className="not-found-card">
				<p className="not-found-code">404</p>
				<h2 id="not-found-title" className="not-found-title">
					Page not found
				</h2>
				<p className="not-found-text">
					The page you are looking for does not exist or may have been moved.
				</p>

				<div className="not-found-actions">
					<Link to="/devices" className="back-link">
						Go to Devices
					</Link>

					<Link to="/stations" className="back-link">
						Go to Stations
					</Link>
				</div>
			</div>
		</section>
	);
}
