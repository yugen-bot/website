import Markdown from 'react-markdown';

import { useBotMetrics } from '../hooks/use-bot-metrics';
import { botInviteUrl, botLogoUrl, botScreenshotUrl } from '../lib/bots';
import type { Bot } from '../lib/bots';

interface BotSectionProps {
	bot: Bot;
	index: number;
}

export default function BotSection({ bot, index }: BotSectionProps) {
	const flip = index % 2 !== 0;
	const metrics = useBotMetrics(bot.id);

	const bg = bot.accentColor
		? `radial-gradient(ellipse 100% 70% at 50% 0%, color-mix(in srgb, ${bot.accentColor} 15%, transparent), transparent 70%)`
		: undefined;

	return (
		<section
			className='
				rounded-t-3xl py-20
				md:py-28
			'
			id={`bot-${bot.id}`}
			style={bg ? { background: bg } : undefined}
		>
			<div
				className={`
					mx-auto flex max-w-6xl flex-col items-center gap-10 px-4
					md:flex-row md:gap-16
					${flip ? `md:flex-row-reverse` : ''}
				`}
			>
				{/* Content */}
				<div className='flex flex-1 flex-col gap-6'>
					<div className='flex items-center gap-4'>
						<img
							alt={bot.name}
							className='rounded-full'
							height={52}
							src={botLogoUrl(bot.id)}
							width={52}
						/>
						<h2 className='font-serif text-4xl font-semibold text-ink'>
							{bot.name}
						</h2>
					</div>

					{/* Status badges */}
					<div className='flex flex-wrap gap-2'>
						<span
							className={`
								inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs
								font-medium
								${
									metrics.loading
										? 'bg-surface-muted text-ink-soft'
										: metrics.online
											? 'bg-green-500/15 text-green-600'
											: 'bg-red-500/15 text-red-500'
								}
							`}
						>
							<div className='relative size-1.5'>
								<span
									className={`
										absolute top-0 left-0 size-1.5 rounded-full
										${
											metrics.loading
												? 'bg-ink-soft'
												: metrics.online
													? 'bg-green-500'
													: 'bg-red-500'
										}
									`}
								/>

								{metrics.online && (
									<span
										className='
											absolute top-0 left-0 size-1.5 animate-ping rounded-full bg-green-500
										'
									/>
								)}
							</div>

							{metrics.loading
								? 'Checking…'
								: metrics.online
									? 'Online'
									: 'Offline'}
						</span>

						{metrics.guilds !== null && (
							<span
								className='
									inline-flex items-center rounded-full border border-line bg-surface/60
									px-3 py-1 text-xs font-medium text-ink-soft
								'
							>
								{metrics.guilds.toLocaleString()} guilds
							</span>
						)}
					</div>

					<div
						className='
							prose max-w-none text-ink-soft prose-neutral
							[&_a]:text-brand-500 [&_a]:no-underline
							[&_a:hover]:underline
							[&_p]:text-lg/relaxed
						'
					>
						<Markdown>{bot.description}</Markdown>
					</div>

					<div className='flex gap-3'>
						<a
							className='
								inline-flex items-center rounded-full bg-brand-600 px-6 py-3 font-medium
								text-white no-underline transition
								hover:bg-brand-700
								focus-visible:ring-2 focus-visible:ring-brand-500
								focus-visible:outline-none
							'
							href={botInviteUrl(bot.id)}
							rel='noopener noreferrer'
							target='_blank'
						>
							Invite
						</a>
						<a
							className='
								inline-flex items-center rounded-full border border-line px-6 py-3
								font-medium text-ink no-underline transition
								hover:bg-surface-muted
								focus-visible:ring-2 focus-visible:ring-brand-500
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

				{/* Screenshot */}
				<div className='w-full flex-1'>
					{botScreenshotUrl(bot.id) ? (
						<img
							alt={`${bot.name} screenshot`}
							className='w-full'
							src={botScreenshotUrl(bot.id)}
						/>
					) : (
						<div
							className='
								flex aspect-video w-full items-center justify-center rounded-2xl border
								border-line bg-surface text-sm text-ink-soft
							'
						>
							Screenshot coming soon
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
