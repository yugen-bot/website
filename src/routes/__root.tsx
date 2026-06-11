import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import Footer from '../components/footer';
import NotFound from '../components/not-found';
import ThemeToggle from '../components/theme-toggle';
import ClerkProvider from '../integrations/clerk/provider';
import appCss from '../styles.css?url';

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => ({
			meta: [
				{ charSet: 'utf8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ title: 'Yugen Stack' },
				{
					name: 'description',
					content:
						'A collection of fun and simplistic Discord bots built to elevate your community.',
				},
				{ name: 'theme-color', content: '#7c3aed' },
				// Open Graph
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: 'Yugen Stack' },
				{ property: 'og:title', content: 'Yugen Stack' },
				{
					property: 'og:description',
					content:
						'A collection of fun and simplistic Discord bots built to elevate your community.',
				},
				{
					property: 'og:image',
					content: 'https://yugen.bot/yugen bot banner.png',
				},
				{ property: 'og:image:alt', content: 'Yugen Stack' },
				{ property: 'og:image:width', content: '1200' },
				{ property: 'og:image:height', content: '630' },
				// Twitter / X
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: 'Yugen Stack' },
				{
					name: 'twitter:description',
					content:
						'A collection of fun and simplistic Discord bots built to elevate your community.',
				},
				{
					name: 'twitter:image',
					content: 'https://yugen.bot/yugen bot banner.png',
				},
			],
			links: [{ rel: 'stylesheet', href: appCss }],
		}),
		shellComponent: RootDocument,
		notFoundComponent: NotFound,
	}
);

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body
				className='
					font-sans wrap-anywhere antialiased
					selection:bg-brand-600/20
				'
			>
				<ClerkProvider>
					<div className='pointer-events-none fixed inset-x-0 top-4 z-50'>
						<div className='mx-auto flex max-w-6xl justify-end px-4'>
							<div className='pointer-events-auto'>
								<ThemeToggle tooltipSide='left' />
							</div>
						</div>
					</div>
					{children}
					<Footer />
					<TanStackDevtools
						config={{
							position: 'bottom-right',
						}}
						plugins={[
							{
								name: 'Tanstack Router',
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</ClerkProvider>
				<Scripts />
			</body>
		</html>
	);
}
