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
		href: 'https://t.me/oydinniso_nasirdinova',
		labelKey: 'social.telegram',
		icon: FaTelegram,
		external: true,
	},
	{
		id: 'instagram',
		href: 'https://instagram.com/oydinniso_nasirdinova',
		labelKey: 'social.instagram',
		icon: FaInstagram,
		external: true,
	},
	{
		id: 'phone',
		href: 'tel:+998901234567',
		labelKey: 'social.phone',
		icon: HiPhone,
	},
	{
		id: 'email',
		href: 'mailto:oydinniso.nasirdinova@example.uz',
		labelKey: 'social.email',
		icon: HiEnvelope,
	},
];
