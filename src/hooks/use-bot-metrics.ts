import { useEffect, useState } from 'react';

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
	const [metrics, setMetrics] = useState<BotMetrics>({
		guilds: null,
		online: false,
		loading: true,
	});

	useEffect(() => {
		const url = `https://${id}-api.yugen.bot/api/metrics`;

		async function fetchMetrics() {
			try {
				const res = await fetch(url);
				if (!res.ok) throw new Error('non-ok response');
				const text = await res.text();
				const guilds = parseMetric(text, 'discord_stat_total_guilds');
				setMetrics({ guilds, online: true, loading: false });
			} catch {
				setMetrics({ guilds: null, online: false, loading: false });
			}
		}

		fetchMetrics();
		const interval = setInterval(fetchMetrics, 30_000);
		return () => clearInterval(interval);
	}, [id]);

	return metrics;
}
