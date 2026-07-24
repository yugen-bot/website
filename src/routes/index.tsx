/*
 * DIRECTION CONTRACT — Yugen Stack landing ("Ink on water")
 *
 * THESIS: The page is a still basin of sumi ink on water, not a stack of bot
 *   cards. It refuses the Discord-bot rut (blurple hero, glowing avatar rings,
 *   feature-card grid, stat bar); restraint is the argument for bots that each
 *   do one thing.
 * OWN-WORLD: Near-monochrome indigo/carbon ink on paper-white water. Zen Old
 *   Mincho display + Zen Kaku Gothic New body (both set the kanji). Card-free,
 *   divided by space and 1px mist. One saturated color per region — that bot's
 *   accent bloom. Flat at rest; elevation only on pointer.
 * STORY: A server owner reads "6 small bots, each does one thing", meets the
 *   family as ink currents, drops to a bot, sees it is alive (ink breathing +
 *   text), and invites it in its own color.
 * FIRST VIEWPORT: Centered — the mark as a bloomed ink bead, 幽玄/yūgen gloss,
 *   the "Yugen Stack" wordmark, the one-liner, owner credit, then the primary
 *   "Meet the bots" ink pill over a live suminagashi field.
 * FORM: Assigned direction #6 (sumi-e / yūgen ink), fused with the medium-
 *   native fluid-ink-basin challenger; staging authored, not the drop-assembly
 *   input. Seed key: yugen1 (scope direction, mode persuade).
 */
import { createFileRoute } from '@tanstack/react-router';

import BotsSection from '../components/bots-section';
import Hero from '../components/hero';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
	return (
		<main className='relative overflow-hidden'>
			<Hero />
			<BotsSection />
		</main>
	);
}
