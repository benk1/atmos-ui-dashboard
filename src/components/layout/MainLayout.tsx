import type { JSX, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

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
							<h1 className="app-title">Atmos UI Dashboard</h1>
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

							<NavLink
								to="/soundings"
								className={({ isActive }) =>
									isActive
										? 'app-nav__link app-nav__link--active'
										: 'app-nav__link'
								}
							>
								Soundings
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
