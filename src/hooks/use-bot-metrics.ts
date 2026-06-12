import { useQuery } from '@tanstack/react-query';

export interface BotMetrics {
	guilds: number | null;
	online: boolean;
	loading: boolean;
}

function parseMetric(text: string, name: string): number | null {
	for (const line of text.split('\n')) {
		const trimmed = line.trim();
		if (trimmed.startsWith('#') || trimmed === '') {
			continue;
		}

		if (trimmed.startsWith(name + ' ') || trimmed.startsWith(name + '{')) {
			const parts = trimmed.split(/\s+/);
			const value = Number.parseFloat(parts[1]);

			if (!Number.isNaN(value)) {
				return value;
			}
		}
	}
	return null;
}

export function useBotMetrics(id: string): BotMetrics {
	const { data, isPending, isSuccess } = useQuery({
		queryKey: ['bot-metrics', id],
		queryFn: async () => {
			const res = await fetch(`https://${id}-api.yugen.bot/api/metrics`);
			if (!res.ok) throw new Error('non-ok response');
			const text = await res.text();
			const guilds = parseMetric(text, 'discord_stat_total_guilds');
			return { guilds };
		},
		refetchInterval: 30_000,
		retry: 2,
		retryDelay: attempt => Math.min(1000 * 2 ** attempt, 10_000),
	});

	return {
		guilds: data?.guilds ?? null,
		online: isSuccess,
		loading: isPending,
	};
}
