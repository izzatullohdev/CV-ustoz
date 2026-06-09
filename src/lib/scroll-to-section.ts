export const SCROLL_OFFSET = 120;

export function scrollToSection(hash: string) {
	if (typeof window === 'undefined') return;

	if (hash === 'bosh') {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		return;
	}

	const target = document.getElementById(hash);
	if (!target) return;

	const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
	window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
