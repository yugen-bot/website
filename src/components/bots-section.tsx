import { BOTS } from '../lib/bots';

import BotSection from './bot-section';

export default function BotsSection() {
	if (BOTS.length === 0) return null;

	return (
		<div>
			{BOTS.map((bot, i) => (
				<BotSection
					bot={bot}
					index={i}
					key={bot.id}
				/>
			))}
		</div>
	);
}
