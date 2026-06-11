import { useEffect, useState } from 'react';

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
	const [data, setData] = useState<OwnerData>({
		username: null,
		avatarUrl: null,
		loading: true,
	});

	useEffect(() => {
		fetch(`https://kusari-api.yugen.bot/api/users/${OWNER_ID}`)
			.then(res => {
				if (!res.ok) throw new Error('non-ok response');
				return res.json();
			})
			.then((json: { username: string; avatarUrl: string }) => {
				setData({
					username: json.username ?? null,
					avatarUrl: json.avatarUrl ? resolveAvatarUrl(json.avatarUrl) : null,
					loading: false,
				});
			})
			.catch(() => {
				setData({ username: null, avatarUrl: null, loading: false });
			});
	}, []);

	return data;
}
