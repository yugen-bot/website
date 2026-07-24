/**
 * Presentation metadata for the ink redesign, kept separate from the bot
 * catalog (`bots.ts`) so the source data stays untouched. Kanji and glosses
 * are drawn from each bot's own description; taglines summarise the existing
 * "how to play" copy in one line for the family constellation.
 */

export interface BotGlyph {
	kanji: string;
	gloss: string;
	tagline: string;
}

export const BOT_GLYPHS: Record<string, BotGlyph> = {
	koto: { kanji: '言', gloss: 'word', tagline: 'Wordle, reimagined.' },
	kusari: { kanji: '鎖', gloss: 'chain', tagline: 'Word-chains, endlessly.' },
	kazu: { kanji: '数', gloss: 'number', tagline: 'Counting, together.' },
	hoshi: { kanji: '星', gloss: 'star', tagline: 'A starboard, multiplied.' },
	hachimitsu: {
		kanji: '蜂蜜',
		gloss: 'honey',
		tagline: 'A honeypot for spam.',
	},
	iro: { kanji: '色', gloss: 'color', tagline: 'Colors, on command.' },
};

const FALLBACK: BotGlyph = { kanji: '幽', gloss: '', tagline: '' };

export function botGlyph(id: string): BotGlyph {
	return BOT_GLYPHS[id] ?? FALLBACK;
}
