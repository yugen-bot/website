import { siGithub, siDiscord } from 'simple-icons';
import { Coffee } from 'lucide-react';

import { BOTS, botLogoUrl } from '../lib/bots';
import { DISCORD_URL, GITHUB_URL, KOFI_URL } from '../lib/links';

import BrandIcon from './brand-icon';
import OwnerCredit from './owner-credit';

export default function Hero() {
	return (
		<section
			className='
				relative animate-rise-in px-8 pt-20 pb-16 text-center
				md:pt-32 md:pb-24
			'
		>
			{/* Round logo with glow ring */}
			<div className='relative mx-auto mb-8 size-32'>
				<div
					className='
						absolute top-1/2 left-1/2 size-72 -translate-1/2 rounded-full bg-brand-500
						opacity-25 blur-2xl
					'
				/>
				<img
					alt='Yugen Stack'
					className='
						relative rounded-full shadow-xl ring-2 ring-brand-500/30 ring-offset-2
						ring-offset-surface-muted
					'
					height={128}
					src='/yugen.gif'
					width={128}
				/>
			</div>

			<h1
				className='
					font-serif text-5xl font-semibold tracking-tight text-ink
					md:text-6xl
					lg:text-7xl
				'
			>
				Yugen Stack
			</h1>

			<p className='mx-auto mt-4 max-w-2xl text-lg text-ink-soft'>
				A collection of fun and simplistic Discord bots built to elevate your
				community.
			</p>

			<div className='mt-4 flex justify-center'>
				<OwnerCredit variant='big' />
			</div>

			<div className='mt-8 flex flex-wrap justify-center gap-3'>
				<a
					className='
						inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3
						font-medium text-white no-underline transition
						hover:bg-brand-700
						focus-visible:ring-2 focus-visible:ring-brand-500
						focus-visible:outline-none
					'
					href={DISCORD_URL}
					rel='noopener noreferrer'
					target='_blank'
				>
					<BrandIcon
						icon={siDiscord}
						size={18}
					/>
					Discord
				</a>
				<a
					className='
						inline-flex items-center gap-2 rounded-full border border-line
						bg-surface/60 px-6 py-3 font-medium text-ink no-underline backdrop-blur-sm
						transition
						hover:bg-surface
						focus-visible:ring-2 focus-visible:ring-brand-500
						focus-visible:outline-none
					'
					href={GITHUB_URL}
					rel='noopener noreferrer'
					target='_blank'
				>
					<BrandIcon
						icon={siGithub}
						size={18}
					/>
					GitHub
				</a>
				<a
					className='
						inline-flex items-center gap-2 rounded-full border border-line bg-surface/60
						px-6 py-3 font-medium text-ink no-underline backdrop-blur-sm transition
						hover:bg-surface
						focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none
					'
					href={KOFI_URL}
					rel='noopener noreferrer'
					target='_blank'
				>
					<Coffee size={18} />
					Buy me a coffee
				</a>
			</div>

			{BOTS.length > 0 && (
				<div className='mt-24 flex flex-wrap justify-center gap-8'>
					{BOTS.map(bot => (
						<a
							className='
								flex flex-col items-center gap-3 no-underline transition
								hover:opacity-80
								focus-visible:ring-2 focus-visible:ring-brand-500
								focus-visible:outline-none
							'
							href={`#bot-${bot.id}`}
							key={bot.id}
						>
							<img
								alt=''
								className='rounded-full'
								height={64}
								src={botLogoUrl(bot.id)}
								width={64}
							/>
							<span className='text-lg font-medium text-ink-soft'>
								{bot.name}
							</span>
						</a>
					))}
				</div>
			)}
		</section>
	);
}
