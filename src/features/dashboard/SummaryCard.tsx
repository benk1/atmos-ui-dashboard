import type { JSX, ReactNode } from 'react';

type SummaryCardProps = {
	title: string;
	value: string | number;
	meta?: string;
	children?: ReactNode;
};

export default function SummaryCard({
	title,
	value,
	meta,
	children,
}: SummaryCardProps): JSX.Element {
	return (
		<article className="summary-card">
			<h3 className="summary-card__title">{title}</h3>
			<p className="summary-card__value">{value}</p>

			{meta ? <p className="summary-card__meta">{meta}</p> : null}

			{children ? (
				<div className="summary-card__content">{children}</div>
			) : null}
		</article>
	);
}
