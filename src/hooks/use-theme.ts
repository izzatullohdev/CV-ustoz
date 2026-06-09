import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme {
	if (typeof window === 'undefined') return 'light';
	const stored = localStorage.getItem('theme');
	return stored === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle('dark', theme === 'dark');
	localStorage.setItem('theme', theme);
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const initial = getStoredTheme();
		setThemeState(initial);
		applyTheme(initial);
		setMounted(true);
	}, []);

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme);
		applyTheme(newTheme);
	}, []);

	return {
		theme,
		setTheme,
		resolvedTheme: theme,
		mounted,
	};
}
