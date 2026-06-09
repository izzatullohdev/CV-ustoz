import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const linkVariants = {
	sidebar:
		'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-white hover:bg-white/10',
	default:
		'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition hover:border-accent hover:text-accent dark:border-border-dark dark:text-paper/70 dark:hover:border-accent dark:hover:text-accent',
} as const;

interface IconLinkProps {
	href: string;
	label: string;
	external?: boolean;
	variant?: keyof typeof linkVariants;
	className?: string;
	children: ReactNode;
}

export function IconLink({
	href,
	label,
	external = false,
	variant = 'default',
	className,
	children,
}: IconLinkProps) {
	return (
		<a
			href={href}
			className={cn(linkVariants[variant], className)}
			aria-label={label}
			{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
		>
			{children}
		</a>
	);
}
