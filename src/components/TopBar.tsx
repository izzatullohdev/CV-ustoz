import { useEffect, useState } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import type { Lang, UIKey } from '../i18n/ui';
import LangSwitcher from './LangSwitcher';
import MobileMenu from './MobileMenu';

interface TopBarProps {
	lang: Lang;
	currentPath: string;
	translations: Record<UIKey, string>;
}

export default function TopBar({ lang, currentPath, translations }: TopBarProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	useEffect(() => {
		setMenuOpen(false);
	}, [currentPath]);

	return (
		<>
			<header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-paper/95 px-4 py-3 backdrop-blur-md lg:px-10 dark:border-border-dark dark:bg-paper-dark/95">
				<button
					type="button"
					className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-accent/10 lg:hidden dark:text-paper"
					aria-label={menuOpen ? translations['menu.close'] : translations['menu.open']}
					aria-expanded={menuOpen}
					aria-controls="mobile-menu"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? (
						<HiXMark className="h-6 w-6" aria-hidden="true" />
					) : (
						<HiBars3 className="h-6 w-6" aria-hidden="true" />
					)}
				</button>

				<div className="hidden lg:block" aria-hidden="true" />

				<LangSwitcher
					currentLang={lang}
					currentPath={currentPath}
					label={translations['lang.switch']}
				/>
			</header>

			<MobileMenu
				open={menuOpen}
				onClose={() => setMenuOpen(false)}
				lang={lang}
				currentPath={currentPath}
				translations={translations}
			/>
		</>
	);
}
