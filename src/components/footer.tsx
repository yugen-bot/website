import { siGithub, siDiscord } from 'simple-icons';

import { DISCORD_URL, GITHUB_URL } from '../lib/links';

import BrandIcon from './brand-icon';
import OwnerCredit from './owner-credit';
import ThemeToggle from './theme-toggle';

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className='mt-8 border-t border-mist'>
			<div
				className='
					mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-8 text-sm
					text-ink-dilute
					md:grid md:grid-cols-3
				'
			>
				{/* Left: copyright + privacy */}
				<div
					className='
						order-3 flex w-full items-center gap-4
						md:order-0 md:w-auto
					'
				>
					<span>© {year} Yugen Stack</span>
					<a
						className='
							transition
							hover:text-sumi
						'
						href='#'
					>
						Privacy policy
					</a>
				</div>

				{/* Center: owner credit */}
				<div
					className='
						order-2 flex w-full justify-start
						md:order-0 md:w-auto md:justify-center
					'
				>
					<OwnerCredit variant='small' />
				</div>

				{/* Right: social nav */}
				<nav
					aria-label='Social links'
					className='
						order-1 flex w-full items-center gap-3
						md:order-0 md:w-auto md:justify-end
					'
				>
					<a
						aria-label='GitHub'
						className='
							rounded-lg p-1.5 transition
							hover:bg-paper-deep hover:text-sumi
						'
						href={GITHUB_URL}
						rel='noopener noreferrer'
						target='_blank'
					>
						<BrandIcon
							icon={siGithub}
							size={20}
						/>
					</a>
					<a
						aria-label='Discord'
						className='
							rounded-lg p-1.5 transition
							hover:bg-paper-deep hover:text-sumi
						'
						href={DISCORD_URL}
						rel='noopener noreferrer'
						target='_blank'
					>
						<BrandIcon
							icon={siDiscord}
							size={20}
						/>
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</footer>
	);
}
