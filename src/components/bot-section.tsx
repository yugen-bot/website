import Markdown from 'react-markdown';

import { useBotMetrics } from '../hooks/use-bot-metrics';
import { botGlyph } from '../lib/bot-glyphs';
import { botInviteUrl, botLogoUrl, botScreenshotUrl } from '../lib/bots';
import type { Bot } from '../lib/bots';

import InkBloom from './ink/ink-bloom';

interface BotSectionProps {
	bot: Bot;
	index: number;
}

/** Pick a legible text color for a filled accent pill via relative luminance. */
function readableOn(hex: string): string {
	const h = hex.replace('#', '');
	const full = h.length === 3 ? [...h].map(c => c + c).join('') : h;
	const int = Number.parseInt(full, 16);
	const [r, g, b] = [(int >> 16) & 255, (int >> 8) & 255, int & 255].map(v => {
		const s = v / 255;
		return s <= 0.039_28 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	});
	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return luminance > 0.42 ? '#0d1420' : '#f5f3ee';
}

export default function BotSection({ bot, index }: BotSectionProps) {
	const flip = index % 2 !== 0;
	const metrics = useBotMetrics(bot.id);
	const glyph = botGlyph(bot.id);
	const accent = bot.accentColor ?? '#38597e';
	const screenshot = botScreenshotUrl(bot.id);

	const statusLabel = metrics.loading
		? 'Checking…'
		: metrics.online
			? 'Online'
			: 'Offline';

	return (
		<section
			className='
				scroll-mt-28 px-6 py-24
				md:py-32
			'
			id={`bot-${bot.id}`}
		>
			<div
				className={`
					mx-auto flex max-w-5xl flex-col items-center gap-12
					md:gap-20
					${flip ? 'md:flex-row-reverse' : 'md:flex-row'}
				`}
			>
				{/* Content */}
				<div className='flex flex-1 flex-col gap-6'>
					<div className='flex items-center gap-4'>
						<img
							alt=''
							className='rounded-full'
							height={48}
							src={botLogoUrl(bot.id)}
							width={48}
						/>
						<div className='flex items-baseline gap-3'>
							<h2 className='font-serif text-4xl font-semibold text-sumi'>
								{bot.name}
							</h2>
							<span className='font-serif text-2xl text-ink-dilute'>
								{glyph.kanji}
								<span className='ml-2 text-sm italic'>{glyph.gloss}</span>
							</span>
						</div>
					</div>

					{glyph.tagline && (
						<p className='-mt-2 font-serif text-xl text-ink-current italic'>
							{glyph.tagline}
						</p>
					)}

					{/* Live status — motion plus text, never color alone */}
					<div className='flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-ink-current'>
						<span className='inline-flex items-center gap-2'>
							<span className='relative flex size-2'>
								<span
									className={`
										size-2 rounded-full
										${
											metrics.loading
												? 'animate-pulse bg-ink-dilute'
												: metrics.online
													? 'animate-breathe'
													: 'bg-ink-dilute'
										}
									`}
									style={
										metrics.online && !metrics.loading
											? ({
													backgroundColor: accent,
													'--breathe-color': `color-mix(in srgb, ${accent} 60%, transparent)`,
												} as React.CSSProperties)
											: undefined
									}
								/>
							</span>
							{statusLabel}
						</span>
						{metrics.guilds !== null && (
							<span className='text-ink-dilute'>
								in{' '}
								<span className='font-medium text-ink-current'>
									{metrics.guilds.toLocaleString()}
								</span>{' '}
								{metrics.guilds === 1 ? 'server' : 'servers'}
							</span>
						)}
					</div>

					<div
						className='
							prose max-w-prose text-ink-current prose-neutral
							[&_a]:text-indigo [&_a]:no-underline
							[&_a:hover]:underline
							[&_p]:text-lg/relaxed
						'
					>
						<Markdown>{bot.description}</Markdown>
					</div>

					<div className='mt-2 flex flex-wrap gap-3'>
						<a
							className='
								inline-flex items-center rounded-full px-7 py-3 font-medium no-underline
								transition duration-300 ease-out
								hover:-translate-y-0.5 hover:shadow-lift
								focus-visible:ring-2 focus-visible:ring-indigo
								focus-visible:ring-offset-2 focus-visible:ring-offset-paper
								focus-visible:outline-none
							'
							href={botInviteUrl(bot.id)}
							rel='noopener noreferrer'
							style={{ backgroundColor: accent, color: readableOn(accent) }}
							target='_blank'
						>
							Invite {bot.name}
						</a>
						<a
							className='
								inline-flex items-center rounded-full border border-mist px-6 py-3
								font-medium text-sumi no-underline transition duration-300 ease-out
								hover:-translate-y-0.5 hover:border-ink-dilute
								focus-visible:ring-2 focus-visible:ring-indigo
								focus-visible:outline-none
							'
							href={bot.voteUrl}
							rel='noopener noreferrer'
							target='_blank'
						>
							Vote
						</a>
					</div>
				</div>

				{/* The current: an ink bloom carrying the screenshot, or the kanji */}
				<div
					className='
						relative flex aspect-square w-full max-w-md flex-1 items-center
						justify-center
					'
				>
					<InkBloom
						accent={accent}
						className='absolute inset-0'
						online={metrics.online}
						seed={index}
					/>
					{screenshot ? (
						<img
							alt={`${bot.name} in a Discord channel`}
							className='relative w-11/12'
							loading='lazy'
							src={screenshot}
						/>
					) : (
						<span
							className='
								relative font-serif text-7xl leading-none text-sumi/80
								md:text-8xl
							'
						>
							{glyph.kanji}
						</span>
					)}
				</div>
			</div>
		</section>
	);
}
