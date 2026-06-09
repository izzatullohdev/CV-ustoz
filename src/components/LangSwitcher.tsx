import { useEffect, useState } from 'react';
import { langLabels, languages, type Lang } from '../i18n/ui';
import { switchLangPath } from '../i18n/utils';

interface LangSwitcherProps {
	currentLang: Lang;
	currentPath: string;
	label: string;
	variant?: 'default' | 'sidebar';
}

export default function LangSwitcher({
	currentLang,
	currentPath,
	label,
	variant = 'default',
}: LangSwitcherProps) {
	const [hash, setHash] = useState('');

	useEffect(() => {
		setHash(window.location.hash);
		const onHashChange = () => setHash(window.location.hash);
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, [currentPath]);

	return (
		<div className="relative inline-flex items-center" role="group" aria-label={label}>
			{languages.map((lang, index) => {
				const isActive = lang === currentLang;
				const href = switchLangPath(currentPath, lang, hash);
				const separatorClass =
					variant === 'sidebar'
						? 'text-white/30'
						: 'text-ink-muted/40 dark:text-paper/30';
				const linkClass =
					variant === 'sidebar'
						? isActive
							? 'font-semibold text-white'
							: 'text-white/70 hover:text-white'
						: isActive
							? 'font-semibold text-accent'
							: 'text-ink-muted hover:text-accent dark:text-paper/60 dark:hover:text-accent';

				return (
					<span key={lang} className="inline-flex items-center">
						{index > 0 && (
							<span className={`mx-1 ${separatorClass}`} aria-hidden="true">
								|
							</span>
						)}
						<a
							href={href}
							lang={lang}
							hrefLang={lang}
							aria-current={isActive ? 'page' : undefined}
							className={`text-sm tracking-wide transition ${linkClass}`}
						>
							{langLabels[lang]}
						</a>
					</span>
				);
			})}
		</div>
	);
}
