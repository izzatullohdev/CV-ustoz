import { socialLinks } from '@/config/social';
import type { UIKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

import { Icon } from './icons/icon';
import { IconLink } from './icons/icon-link';

type SocialLabels = Record<
	Extract<UIKey, 'social.telegram' | 'social.instagram' | 'social.phone' | 'social.email'>,
	string
>;

interface SocialLinksProps {
	labels: SocialLabels;
	variant?: 'sidebar' | 'default';
	className?: string;
}

export default function SocialLinks({
	labels,
	variant = 'sidebar',
	className,
}: SocialLinksProps) {
	const containerClass =
		variant === 'sidebar'
			? 'mt-6 flex items-center gap-5'
			: 'flex items-center gap-3';

	return (
		<div className={cn(containerClass, className)}>
			{socialLinks.map(({ id, href, labelKey, icon, external }) => (
				<IconLink
					key={id}
					href={href}
					label={labels[labelKey]}
					external={external}
					variant={variant}
				>
					<Icon icon={icon} size="sm" />
				</IconLink>
			))}
		</div>
	);
}
