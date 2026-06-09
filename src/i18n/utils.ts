import { defaultLang, languages, type Lang, type UIKey, ui } from './ui';

export function isValidLang(lang: string): lang is Lang {
	return (languages as readonly string[]).includes(lang);
}

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split('/');
	if (maybeLang && isValidLang(maybeLang)) {
		return maybeLang;
	}
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return ui[lang][key];
	};
}

export function localizedPath(lang: Lang, segment = ''): string {
	const normalized = segment.replace(/^\/+|\/+$/g, '');
	return normalized ? `/${lang}/${normalized}/` : `/${lang}/`;
}

export function hashNavPath(lang: Lang, hash: string): string {
	return `${localizedPath(lang, '')}#${hash}`;
}

export function isHomePath(path: string, lang: Lang): boolean {
	const normalized = path.split('#')[0]!.replace(/\/$/, '') || `/${lang}`;
	return normalized === `/${lang}`;
}

export function switchLangPath(currentPath: string, targetLang: Lang, hash = ''): string {
	const pathname = currentPath.split('#')[0]!;
	const segments = pathname.split('/').filter(Boolean);

	if (segments.length === 0 || !isValidLang(segments[0]!)) {
		return localizedPath(targetLang) + hash;
	}

	segments[0] = targetLang;
	const base = `/${segments.join('/')}${pathname.endsWith('/') ? '/' : ''}`;
	return base + hash;
}

export function getStaticLangPaths() {
	return languages.map((lang) => ({ params: { lang } }));
}
