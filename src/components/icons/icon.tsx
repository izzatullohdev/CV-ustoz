import type { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

const iconSizes = {
	sm: 'h-4 w-4',
	md: 'h-5 w-5',
	lg: 'h-6 w-6',
} as const;

export type IconSize = keyof typeof iconSizes;

interface IconProps {
	icon: IconType;
	size?: IconSize;
	className?: string;
}

export function Icon({ icon: IconComponent, size = 'md', className }: IconProps) {
	return (
		<IconComponent
			className={cn(iconSizes[size], 'shrink-0', className)}
			aria-hidden="true"
		/>
	);
}
