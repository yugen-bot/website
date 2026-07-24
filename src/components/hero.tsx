import { Coffee } from 'lucide-react';
import { siGithub, siDiscord } from 'simple-icons';

import { botGlyph } from '../lib/bot-glyphs';
import { BOTS } from '../lib/bots';
import { DISCORD_URL, GITHUB_URL, KOFI_URL } from '../lib/links';

import BrandIcon from './brand-icon';
import OwnerCredit from './owner-credit';

const firstBotHref = BOTS.length > 0 ? `#bot-${BOTS[0].id}` : '#bots';

export default function Hero() {
	return (
		<section
			className='
				relative isolate px-6 pt-28 pb-12
				md:pt-36
			'
		>
			{/* A still indigo wash, settling into the page below */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10'
				style={{
					opacity: 0.55,
					background:
						'radial-gradient(ellipse 120% 55% at 50% -8%, color-mix(in srgb, var(--color-indigo) 30%, transparent), transparent 62%)',
					maskImage: 'linear-gradient(to bottom, black 55%, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent)',
				}}
			/>

			<div className='mx-auto flex max-w-3xl flex-col items-center text-center'>
				{/* The mark, as an ink bead that has bloomed */}
				<div className='relative mb-10'>
					<span
						aria-hidden='true'
						className='
							absolute top-1/2 left-1/2 size-40 -translate-1/2 rounded-full blur-2xl
						'
						style={{
							background:
								'radial-gradient(circle, color-mix(in srgb, var(--color-indigo) 45%, transparent), transparent 70%)',
						}}
					/>
					<img
						alt='Yugen Stack'
						className='relative rounded-full'
						height={104}
						src='/yugen.gif'
						width={104}
					/>
				</div>

				<p className='font-serif text-lg tracking-wide text-ink-dilute'>
					<span className='text-2xl text-ink-current'>幽玄</span>
					<span className='mx-3 align-middle'>·</span>
					<span className='italic'>yūgen</span> — a subtle, profound grace
				</p>

				<h1
					className='
						mt-5 font-serif text-6xl leading-[1.02] font-bold tracking-tight text-sumi
						md:text-7xl
					'
				>
					Yugen Stack
				</h1>

				<p className='mt-6 max-w-xl text-lg/relaxed text-ink-current'>
					Simple & small Discord bots. Each does one thing — beautifully — with
					little to no configuration.
				</p>

				<div className='mt-7'>
					<OwnerCredit variant='big' />
				</div>

				{/* Primary path funnels into the family; support links stay quiet */}
				<div className='mt-10 flex flex-col items-center gap-5'>
					<a
						className='
							inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-3.5
							font-medium text-paper no-underline transition duration-300 ease-out
							hover:-translate-y-0.5 hover:shadow-lift
							focus-visible:ring-2 focus-visible:ring-indigo
							focus-visible:ring-offset-2 focus-visible:ring-offset-paper
							focus-visible:outline-none
						'
						href={firstBotHref}
					>
						Meet the bots
					</a>

					<nav
						aria-label='Yugen links'
						className='
							flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm
							text-ink-current
						'
					>
						<a
							className='
								inline-flex items-center gap-2 no-underline transition
								hover:text-sumi
								focus-visible:ring-2 focus-visible:ring-indigo
								focus-visible:outline-none
							'
							href={DISCORD_URL}
							rel='noopener noreferrer'
							target='_blank'
						>
							<BrandIcon
								icon={siDiscord}
								size={16}
							/>
							Support server
						</a>
						<a
							className='
								inline-flex items-center gap-2 no-underline transition
								hover:text-sumi
								focus-visible:ring-2 focus-visible:ring-indigo
								focus-visible:outline-none
							'
							href={GITHUB_URL}
							rel='noopener noreferrer'
							target='_blank'
						>
							<BrandIcon
								icon={siGithub}
								size={16}
							/>
							Open source
						</a>
						<a
							className='
								inline-flex items-center gap-2 no-underline transition
								hover:text-sumi
								focus-visible:ring-2 focus-visible:ring-indigo
								focus-visible:outline-none
							'
							href={KOFI_URL}
							rel='noopener noreferrer'
							target='_blank'
						>
							<Coffee size={16} />
							Buy me a coffee
						</a>
					</nav>
				</div>
			</div>

			{/* The family, as a constellation of ink currents */}
			{BOTS.length > 0 && (
				<ul
					className='
						mx-auto mt-24 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-12
						md:mt-32
					'
				>
					{BOTS.map((bot, i) => {
						const glyph = botGlyph(bot.id);
						return (
							<li key={bot.id}>
								<a
									className='
										group flex w-24 flex-col items-center gap-3 no-underline
										focus-visible:outline-none
									'
									href={`#bot-${bot.id}`}
								>
									<span className='relative flex size-20 items-center justify-center'>
										<span
											aria-hidden='true'
											className={`
												absolute inset-0 rounded-full blur-md transition-transform
												duration-500 ease-out
												group-hover:scale-110
												${i % 2 === 0 ? 'animate-drift' : 'animate-drift-slow'}
											`}
											style={{
												opacity: 0.3,
												background: `radial-gradient(circle at 45% 40%, color-mix(in srgb, ${bot.accentColor ?? '#38597e'} 65%, transparent), transparent 70%)`,
											}}
										/>
										<span className='relative font-serif text-3xl text-sumi'>
											{glyph.kanji}
										</span>
									</span>
									<span className='text-center'>
										<span
											className='
												block font-serif text-base text-sumi transition-colors
												group-hover:text-(--bot-accent)
											'
											style={
												{
													'--bot-accent': bot.accentColor ?? '#38597e',
												} as React.CSSProperties
											}
										>
											{bot.name}
										</span>
										<span className='block text-xs text-ink-dilute'>
											{glyph.gloss}
										</span>
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
