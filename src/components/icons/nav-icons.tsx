import {
	HiBookOpen,
	HiChatBubbleLeftRight,
	HiDocumentText,
	HiEnvelope,
	HiGlobeAlt,
	HiHome,
	HiNewspaper,
	HiPencilSquare,
	HiTrophy,
	HiUser,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';

import type { UIKey } from '@/i18n/ui';

import { Icon, type IconSize } from './icon';

const navIconMap: Partial<Record<UIKey, IconType>> = {
	'nav.home': HiHome,
	'nav.bio': HiUser,
	'nav.darslar': HiBookOpen,
	'nav.ijod': HiPencilSquare,
	'nav.yutuqlar': HiTrophy,
	'nav.fikrlar': HiChatBubbleLeftRight,
	'nav.maqolalar': HiNewspaper,
	'nav.cv': HiDocumentText,
	'nav.aloqa': HiEnvelope,
};

export const skillIconMap = {
	classics: HiBookOpen,
	poetry: HiPencilSquare,
	culture: HiGlobeAlt,
} as const satisfies Record<string, IconType>;

interface NavIconProps {
	name: UIKey;
	size?: IconSize;
	className?: string;
}

export function NavIcon({ name, size = 'md', className }: NavIconProps) {
	const icon = navIconMap[name];
	if (!icon) return null;
	return <Icon icon={icon} size={size} className={className} />;
}

interface SkillIconProps {
	name: keyof typeof skillIconMap;
	size?: IconSize;
	className?: string;
}

export function SkillIcon({ name, size = 'md', className }: SkillIconProps) {
	return <Icon icon={skillIconMap[name]} size={size} className={className} />;
}
