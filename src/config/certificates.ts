import fs from 'node:fs';
import path from 'node:path';

import type { Lang } from '../i18n/ui';

export const CERTIFICATES_DIR = 'sertifikatlar';

export interface CertificateFile {
	number: number;
	filename: string;
	url: string;
	title: string;
}

type LocalizedTitle = Record<Lang, string>;

/** Titles taken from each certificate PDF. */
const CERTIFICATE_TITLES: Record<number, LocalizedTitle> = {
	1: {
		uz: 'Navoiy davlat stipendiyasi guvohnomasi',
		ru: 'Свидетельство обладателя государственной стипендии Навои',
		en: 'Navoi State Scholarship certificate',
	},
	2: {
		uz: 'Ona tili va adabiyot — Respublika olimpiadasi diplomi (1-o\'rin)',
		ru: 'Диплом Республиканской олимпиады по родному языку и литературе (1 место)',
		en: 'Republican Olympiad diploma in native language and literature (1st place)',
	},
	3: {
		uz: '«Urush bo\'lmasin jahonda» insholar tanlovi sertifikati',
		ru: 'Сертификат конкурса сочинений «Urush bo\'lmasin jahonda»',
		en: 'Essay competition certificate «May there be no war in the world»',
	},
	4: {
		uz: '«Kamolot — kelajak tayanchi» qishki faollar maktabi',
		ru: 'Зимняя школа активистов «Kamolot — kelajak tayanchi»',
		en: '«Kamolot — support of the future» winter activists school',
	},
	5: {
		uz: '«Kitobxonlar bayrami» — «Kitob tafakkur xazinasi» (2-darajali diplom)',
		ru: '«Праздник читателей» — «Книга — сокровищница мысли» (диплом II степени)',
		en: '«Book Lovers\' Holiday» — «Book is the treasury of thought» (2nd degree diploma)',
	},
	6: {
		uz: 'Ona tili va adabiyoti — Respublika olimpiadasi g\'olibi (1-o\'rin)',
		ru: 'Победитель Республиканской олимпиады по родному языку и литературе (1 место)',
		en: 'Republican Olympiad winner in native language and literature (1st place)',
	},
	7: {
		uz: '«Globallashuv davrida til va ta\'lim: nazariya va amaliyot» konferensiyasi',
		ru: 'Конференция «Язык и образование в эпоху глобализации: теория и практика»',
		en: 'Conference «Language and education in the era of globalization: theory and practice»',
	},
	8: {
		uz: 'Central Asian Journal of Literature, Philosophy and Culture — nashr sertifikati',
		ru: 'Сертификат публикации — Central Asian Journal of Literature, Philosophy and Culture',
		en: 'Certificate of Publication — Central Asian Journal of Literature, Philosophy and Culture',
	},
	9: {
		uz: 'American Journal of Language, Literacy and Learning in STEM Education — nashr sertifikati',
		ru: 'Сертификат публикации — American Journal of Language, Literacy and Learning in STEM Education',
		en: 'Certificate of Publication — American Journal of Language, Literacy and Learning in STEM Education',
	},
	10: {
		uz: '«O\'zbek tilining xorijda o\'qitilishi: ta\'lim nazariyasi va amaliyoti» konferensiyasi',
		ru: 'Конференция «Преподавание узбекского языка за рубежом: теория и практика»',
		en: 'Conference «Teaching Uzbek abroad: theory and practice of education»',
	},
	11: {
		uz: 'American Journal of Philological Sciences — minnatdorchilik sertifikati',
		ru: 'Сертификат благодарности — American Journal of Philological Sciences',
		en: 'Certificate of Appreciation — American Journal of Philological Sciences',
	},
};

function toPublicUrl(filename: string): string {
	return `/${[CERTIFICATES_DIR, filename].map(encodeURIComponent).join('/')}`;
}

function fallbackTitle(number: number, lang: Lang): string {
	if (lang === 'ru') return `Сертификат ${number}`;
	if (lang === 'en') return `Certificate ${number}`;
	return `Sertifikat ${number}`;
}

export function getCertificates(lang: Lang = 'uz'): CertificateFile[] {
	const root = path.join(process.cwd(), 'public', CERTIFICATES_DIR);
	if (!fs.existsSync(root)) return [];

	return fs
		.readdirSync(root)
		.filter((file) => file.toLowerCase().endsWith('.pdf') && !file.startsWith('.'))
		.map((filename) => {
			const match = filename.match(/^(\d+)/);
			const number = match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
			const titles = CERTIFICATE_TITLES[number];
			return {
				number,
				filename,
				url: toPublicUrl(filename),
				title: titles?.[lang] ?? fallbackTitle(number, lang),
			};
		})
		.sort((a, b) => a.number - b.number);
}
