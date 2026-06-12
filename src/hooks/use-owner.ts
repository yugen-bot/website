import { useQuery } from '@tanstack/react-query';

import { OWNER_ID } from '../lib/config';

interface OwnerData {
	username: string | null;
	avatarUrl: string | null;
	loading: boolean;
}

function resolveAvatarUrl(avatar: string): string {
	if (avatar.startsWith('http')) return avatar;
	return `https://cdn.discordapp.com/avatars/${OWNER_ID}/${avatar}.png`;
}

export function useOwner(): OwnerData {
	const { data, isPending } = useQuery({
		queryKey: ['owner', OWNER_ID],
		queryFn: async () => {
			const res = await fetch(
				`https://kusari-api.yugen.bot/api/users/${OWNER_ID}`
			);
			if (!res.ok) throw new Error('non-ok response');
			return res.json() as Promise<{ username: string; avatarUrl: string }>;
		},
		staleTime: Infinity,
		retry: 2,
		retryDelay: attempt => Math.min(1000 * 2 ** attempt, 10_000),
	});

	return {
		username: data?.username ?? null,
		avatarUrl: data?.avatarUrl ? resolveAvatarUrl(data.avatarUrl) : null,
		loading: isPending,
	};
}
