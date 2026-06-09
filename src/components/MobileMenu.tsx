import type { Lang, UIKey } from '../i18n/ui';
import SocialLinks from './SocialLinks';
import SidebarNav from './SidebarNav';
import ThemeSwitch from './ui/theme-switch';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
	lang: Lang;
	currentPath: string;
	translations: Record<UIKey, string>;
}

export default function MobileMenu({
	open,
	onClose,
	lang,
	currentPath,
	translations,
}: MobileMenuProps) {
	return (
		<>
			<button
				type="button"
				className={cn(
					'fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 lg:hidden',
					open ? 'opacity-100' : 'pointer-events-none opacity-0',
				)}
				aria-label={translations['menu.close']}
				onClick={onClose}
			/>

			<div
				id="mobile-menu"
				className={cn(
					'fixed inset-x-0 top-0 z-40 max-h-[92vh] overflow-y-auto bg-accent px-4 pb-8 pt-17 text-white shadow-lg transition-transform duration-300 ease-out lg:hidden',
					open ? 'translate-y-0' : 'pointer-events-none -translate-y-full',
				)}
				aria-hidden={!open}
			>
				<div className="flex flex-col items-center text-center">
					<div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-[3px] border-white/40 shadow-lg">
						<img
							src="/images/portrait.jpg"
							alt={translations['profile.name']}
							width={96}
							height={96}
							className="h-full w-full object-cover object-top"
							loading="lazy"
						/>
					</div>
					<p className="font-sans text-lg text-white">{translations['profile.name']}</p>
					<p className="mt-1 text-xs font-semibold tracking-wide text-white/90 uppercase">
						{translations['profile.role']}
					</p>
				</div>

				<SocialLinks
					className="mt-4 justify-center"
					labels={{
						'social.telegram': translations['social.telegram'],
						'social.instagram': translations['social.instagram'],
						'social.phone': translations['social.phone'],
						'social.email': translations['social.email'],
					}}
				/>

				<div className="mt-6 w-full border-t border-white/20 pt-6">
					<SidebarNav
						lang={lang}
						currentPath={currentPath}
						translations={translations}
						onNavigate={onClose}
					/>
				</div>

				<div className="mt-6 space-y-4">
					<a
						href="/cv.pdf"
						download
						className="flex w-full items-center justify-center rounded-md bg-accent-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
					>
						{translations['hero.cta.cv']}
					</a>

					<div className="flex items-center justify-between rounded-md px-1 py-1">
						<span className="text-sm text-white/80">{translations['theme.dark']}</span>
						<ThemeSwitch className="[&_.peer]:bg-white/25 [&_.peer]:data-[state=checked]:bg-white/40" />
					</div>
				</div>
			</div>
		</>
	);
}
