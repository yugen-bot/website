import { createFileRoute } from '@tanstack/react-router';

import BotsSection from '../components/bots-section';
import Hero from '../components/hero';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
	return (
		<main className='relative overflow-hidden px-4 pt-12 pb-16'>
			{/* Page-level glow blobs */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0'
			>
				<div
					className='
						absolute top-0 left-1/2 h-150 w-200 -translate-x-1/2 -translate-y-1/3
						rounded-full bg-brand-600 opacity-25 blur-6xl
					'
				/>
				<div
					className='
						absolute top-1/4 left-1/4 size-96 -translate-x-1/2 rounded-full
						bg-violet-500 opacity-10 blur-5xl
					'
				/>
				<div
					className='
						absolute top-1/3 right-1/4 size-72 translate-x-1/2 rounded-full
						bg-purple-400 opacity-10 blur-4xl
					'
				/>
			</div>
			<Hero />
			<BotsSection />
		</main>
	);
}
