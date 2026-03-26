import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import type { JSX } from 'react';

type MainLayoutProps = {
	children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
	return (
		<div className="app-shell">
			<header className="app-header">
				<div className="container">
					<div className="app-header__content">
						<div>
							<h1 className="app-title">atmos-ui-dashboard</h1>
							<p className="app-subtitle">
								Modern React + TypeScript frontend training project
							</p>
						</div>

						<nav className="app-nav" aria-label="Primary">
							<NavLink
								to="/devices"
								className={({ isActive }) =>
									isActive
										? 'app-nav__link app-nav__link--active'
										: 'app-nav__link'
								}
							>
								Devices
							</NavLink>

							<NavLink
								to="/stations"
								className={({ isActive }) =>
									isActive
										? 'app-nav__link app-nav__link--active'
										: 'app-nav__link'
								}
							>
								Stations
							</NavLink>
						</nav>
					</div>
				</div>
			</header>

			<main className="app-main">
				<div className="container">{children}</div>
			</main>
		</div>
	);
}
