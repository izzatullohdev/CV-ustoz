import { socialLinks } from './social';
import type { Lang } from '../i18n/ui';

export const SITE_URL = 'https://oydinniso-nasirdinova.uz';
export const OG_IMAGE_PATH = '/images/portrait.jpg';
export const OG_IMAGE_WIDTH = 709;
export const OG_IMAGE_HEIGHT = 945;
export const PERSON_FULL_NAME = 'Nasirdinova Oydinniso Dagarovna';

export const ogLocaleMap: Record<Lang, string> = {
	uz: 'uz_UZ',
	ru: 'ru_RU',
	en: 'en_US',
};

export const hrefLangMap: Record<Lang, string> = {
	uz: 'uz',
	ru: 'ru',
	en: 'en',
};

export interface SeoContent {
	title: string;
	description: string;
	keywords: string;
	profileName: string;
	role: string;
}

export function absoluteUrl(path: string, origin: string = SITE_URL): string {
	return new URL(path, origin).href;
}

export function buildJsonLd(
	lang: Lang,
	origin: string,
	canonicalUrl: string,
	content: SeoContent,
) {
	const sameAs = socialLinks
		.filter((link) => link.external)
		.map((link) => link.href);

	const profileUrl = absoluteUrl(`/${lang}/`, origin);

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${origin}/#website`,
				url: origin,
				name: content.title,
				description: content.description,
				inLanguage: ['uz', 'ru', 'en'],
				publisher: { '@id': `${origin}/#person` },
			},
			{
				'@type': 'Person',
				'@id': `${origin}/#person`,
				name: PERSON_FULL_NAME,
				alternateName: content.profileName,
				jobTitle: content.role,
				description: content.description,
				image: absoluteUrl(OG_IMAGE_PATH, origin),
				url: profileUrl,
				sameAs,
				email: 'oydinnisonasirdinova0@gmail.com',
				telephone: '+998977133001',
				nationality: {
					'@type': 'Country',
					name: 'Uzbekistan',
				},
				knowsAbout: [
					"O'zbek tili",
					"O'zbek adabiyoti",
					'Lingvistika',
					'Tilshunoslik',
					'Ilmiy tadqiqot',
				],
				alumniOf: [
					{
						'@type': 'CollegeOrUniversity',
						name: "ToshDO'TAU",
					},
					{
						'@type': 'CollegeOrUniversity',
						name: "O'zbekiston Milliy universiteti",
					},
				],
				worksFor: {
					'@type': 'CollegeOrUniversity',
					name: "ToshDO'TAU",
				},
			},
			{
				'@type': 'ProfilePage',
				'@id': `${canonicalUrl}#webpage`,
				url: canonicalUrl,
				name: content.title,
				description: content.description,
				isPartOf: { '@id': `${origin}/#website` },
				about: { '@id': `${origin}/#person` },
				inLanguage: hrefLangMap[lang],
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: absoluteUrl(OG_IMAGE_PATH, origin),
					width: OG_IMAGE_WIDTH,
					height: OG_IMAGE_HEIGHT,
				},
			},
		],
	};
}
