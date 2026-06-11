import { Sun, Moon, SunMoon } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

function getInitialMode(): ThemeMode {
	if (globalThis.window === undefined) {
		return 'auto';
	}

	const stored = globalThis.localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark' || stored === 'auto') {
		return stored;
	}

	return 'auto';
}

function applyThemeMode(mode: ThemeMode) {
	const prefersDark = globalThis.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;
	const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;

	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(resolved);

	if (mode === 'auto') {
		delete document.documentElement.dataset.theme;
	} else {
		document.documentElement.dataset.theme = mode;
	}

	document.documentElement.style.colorScheme = resolved;
}

interface ThemeToggleProps {
	tooltipSide?: 'top' | 'bottom' | 'left';
}

export default function ThemeToggle({ tooltipSide = 'top' }: ThemeToggleProps) {
	const [mode, setMode] = useState<ThemeMode>('auto');

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	useEffect(() => {
		if (mode !== 'auto') {
			return;
		}

		const media = globalThis.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => applyThemeMode('auto');

		media.addEventListener('change', onChange);
		return () => {
			media.removeEventListener('change', onChange);
		};
	}, [mode]);

	function toggleMode() {
		const nextMode: ThemeMode =
			mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light';
		setMode(nextMode);
		applyThemeMode(nextMode);
		globalThis.localStorage.setItem('theme', nextMode);
	}

	const label =
		mode === 'auto'
			? 'Theme mode: auto (system). Click to switch to light mode.'
			: `Theme mode: ${mode}. Click to switch mode.`;

	const tooltipLabel =
		mode === 'auto' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light';

	return (
		<div className='group relative'>
			<button
				aria-label={label}
				className='
					cursor-pointer rounded-full border border-line bg-surface p-2 text-ink
					transition
					hover:-translate-y-0.5
				'
				type='button'
				onClick={toggleMode}
			>
				{mode === 'auto' ? (
					<SunMoon size={16} />
				) : mode === 'dark' ? (
					<Moon size={16} />
				) : (
					<Sun size={16} />
				)}
			</button>
			<span
				className={`
					pointer-events-none absolute rounded-md bg-ink px-2 py-1 text-xs
					whitespace-nowrap text-surface opacity-0 transition-opacity
					group-hover:opacity-100
					${
						tooltipSide === 'bottom'
							? 'top-full left-1/2 mt-2 -translate-x-1/2'
							: tooltipSide === 'left'
								? 'top-1/2 right-full mr-2 -translate-y-1/2'
								: 'bottom-full left-1/2 mb-2 -translate-x-1/2'
					}
				`}
			>
				{tooltipLabel}
			</span>
		</div>
	);
}
