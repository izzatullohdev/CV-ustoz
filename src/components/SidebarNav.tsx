import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Lang, UIKey } from '../i18n/ui';
import { navItems } from '../i18n/ui';
import { hashNavPath, isHomePath } from '../i18n/utils';
import { SCROLL_OFFSET, scrollToSection } from '../lib/scroll-to-section';
import { NavIcon } from './icons';

interface SidebarNavProps {
	lang: Lang;
	currentPath: string;
	translations: Record<UIKey, string>;
	onNavigate?: () => void;
}

function getActiveHash(): string {
	if (typeof window === 'undefined') return 'bosh';
	return window.location.hash.replace('#', '') || 'bosh';
}

function getSectionInView(sectionIds: string[]): string {
	let current = sectionIds[0] ?? 'bosh';
	for (const id of sectionIds) {
		const el = document.getElementById(id);
		if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET) {
			current = id;
		}
	}
	return current;
}

export default function SidebarNav({ lang, currentPath, translations, onNavigate }: SidebarNavProps) {
	const [activeHash, setActiveHash] = useState('bosh');
	const programmaticScroll = useRef(false);
	const onHome = isHomePath(currentPath, lang);

	useEffect(() => {
		if (!onHome) return;

		const syncFromHash = () => {
			setActiveHash(getActiveHash());
		};

		if (!window.location.hash) {
			window.history.replaceState(null, '', hashNavPath(lang, 'bosh'));
			setActiveHash('bosh');
			window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		} else {
			syncFromHash();
			const hash = getActiveHash();
			requestAnimationFrame(() => scrollToSection(hash));
		}

		window.addEventListener('hashchange', syncFromHash);
		return () => window.removeEventListener('hashchange', syncFromHash);
	}, [onHome, lang, currentPath]);

	useEffect(() => {
		if (!onHome) return;

		const sectionIds = navItems.map((item) => item.hash);
		let ticking = false;

		const updateFromScroll = () => {
			if (programmaticScroll.current) return;

			const current = getSectionInView(sectionIds);
			setActiveHash((prev) => {
				if (prev === current) return prev;
				window.history.replaceState(null, '', hashNavPath(lang, current));
				return current;
			});
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				updateFromScroll();
				ticking = false;
			});
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		updateFromScroll();

		return () => window.removeEventListener('scroll', onScroll);
	}, [onHome, lang, currentPath]);

	const navigateToSection = (hash: string) => {
		programmaticScroll.current = true;
		scrollToSection(hash);
		window.history.pushState(null, '', hashNavPath(lang, hash));
		setActiveHash(hash);
		onNavigate?.();

		window.setTimeout(() => {
			programmaticScroll.current = false;
		}, 1000);
	};

	const handleClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
		if (!onHome) return;
		event.preventDefault();
		navigateToSection(hash);
	};

	return (
		<nav className="w-full" aria-label="Main">
			<ul className="flex flex-col gap-1">
				{navItems.map(({ key, hash }) => {
					const active = onHome && activeHash === hash;
					return (
						<li key={key}>
							<a
								href={hashNavPath(lang, hash)}
								onClick={(event) => handleClick(event, hash)}
								className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
									active
										? 'bg-white/15 font-semibold text-white'
										: 'text-white/80 hover:bg-white/10 hover:text-white'
								}`}
								aria-current={active ? 'true' : undefined}
							>
								<NavIcon name={key} />
								<span>{translations[key]}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
