import { useEffect, useState, type MouseEvent } from 'react';
import type { Lang, UIKey } from '../i18n/ui';
import { navItems } from '../i18n/ui';
import { hashNavPath, isHomePath } from '../i18n/utils';
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

function scrollToSection(hash: string) {
	const target = document.getElementById(hash);
	if (!target) return;
	target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SidebarNav({ lang, currentPath, translations, onNavigate }: SidebarNavProps) {
	const [activeHash, setActiveHash] = useState('bosh');
	const onHome = isHomePath(currentPath, lang);

	useEffect(() => {
		const updateHash = () => setActiveHash(getActiveHash());
		updateHash();
		window.addEventListener('hashchange', updateHash);
		return () => window.removeEventListener('hashchange', updateHash);
	}, [currentPath]);

	useEffect(() => {
		if (!onHome) return;
		const hash = getActiveHash();
		if (hash === 'bosh') return;
		requestAnimationFrame(() => scrollToSection(hash));
	}, [onHome, currentPath]);

	const handleClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
		if (!onHome) return;
		event.preventDefault();
		scrollToSection(hash);
		window.history.pushState(null, '', hashNavPath(lang, hash));
		setActiveHash(hash);
		onNavigate?.();
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
