import { FaInstagram, FaTelegram } from 'react-icons/fa6';
import { HiEnvelope, HiPhone } from 'react-icons/hi2';
import type { IconType } from 'react-icons';

import type { UIKey } from '@/i18n/ui';

export interface SocialLinkConfig {
	id: string;
	href: string;
	labelKey: Extract<
		UIKey,
		'social.telegram' | 'social.instagram' | 'social.phone' | 'social.email'
	>;
	icon: IconType;
	external?: boolean;
}

export const socialLinks: SocialLinkConfig[] = [
	{
		id: 'telegram',
		href: 'https://t.me/Nasirdinova_O',
		labelKey: 'social.telegram',
		icon: FaTelegram,
		external: true,
	},
	{
		id: 'instagram',
		href: 'https://www.instagram.com/oydinnisonasirdinova?igsh=a3dvM2hzeHI0b2Zh&utm_source=qr',
		labelKey: 'social.instagram',
		icon: FaInstagram,
		external: true,
	},
	{
		id: 'phone',
		href: 'tel:+998977133001',
		labelKey: 'social.phone',
		icon: HiPhone,
	},
	{
		id: 'email',
		href: 'mailto:oydinnisonasirdinova0@gmail.com',
		labelKey: 'social.email',
		icon: HiEnvelope,
	},
];
