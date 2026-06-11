export interface Bot {
	id: string;
	name: string;
	description: string;
	accentColor?: string;
	voteUrl: string;
}

export function botLogoUrl(id: string): string {
	return `https://github.com/yugen-bot/bots/blob/main/assets/${id}.gif?raw=true`;
}

export function botInviteUrl(id: string): string {
	return `https://invite-${id}.yugen.bot`;
}

export function botScreenshotUrl(id: string): string {
	return `/${id}-example.png`;
}

export const BOTS: Bot[] = [
	{
		id: 'koto',
		name: 'Koto',
		description: `An all new and improved wordle on discord bot! Koto (言 - word)

**How to Play:**
- Each guess must be a valid 6 letter word in the Koto words list.
- Points are awarded for each *new* discovery
- Type <any valid 6 letter word> to make a guess (no prefix needed, but you can prefix it with ! if you are a Co-ordle veteran)
- You only have 9 guesses per Koto game, so be careful!
`,
		accentColor: '#B9AD6C',
		voteUrl: 'https://top.gg/bot/1164654805730472018',
	},
	{
		id: 'kusari',
		name: 'Kusari',
		description: `An all new and improved word-chain on discord bot! Kusari (鎖 - chains)

**How to Play:**
- The first word can be any word
- Each word afterwards has to start with the last letter of the previous word
- That's it! Enjoy!`,
		accentColor: '#81BA6C',
		voteUrl: 'https://top.gg/bot/1186650405703262208',
	},
	{
		id: 'kazu',
		name: 'Kazu',
		description: `An all new and improved counting on discord bot! Kazu(数 - number)

**How to Play:**
- The first count must be 1.
- Each count afterwards has to be one number higher than the previous count. It can also be an equation when math is enabled.
- A single person can not count twice in a row!
- That's it! Enjoy!`,
		accentColor: '#5C80ED',
		voteUrl: 'https://top.gg/bot/1260679337594589356',
	},
	{
		id: 'hoshi',
		name: 'Hoshi',
		description: `A simple starboard bot with multiple starboard support! Hoshi (星 - star)

**Multiple starboards:**

To add another starboard, use \`/starboard add\`.

*Notes:*
- Hoshi does not yet support super reactions!`,
		accentColor: '#ECE15C',
		voteUrl: 'https://top.gg/bot/1208707348659445800',
	},
	{
		id: 'iro',
		name: 'Iro',
		description: `A simple color replying discord bot! Iro(色 - color)`,
		accentColor: '#DC3563',
		voteUrl: 'https://top.gg/bot/1305247349702135908',
	},
];
