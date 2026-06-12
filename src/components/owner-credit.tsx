import { useOwner } from '../hooks/use-owner';

interface OwnerCreditProps {
	variant: 'big' | 'small';
}

export default function OwnerCredit({ variant }: OwnerCreditProps) {
	const { username, avatarUrl, loading } = useOwner();
	const isBig = variant === 'big';

	if (loading || !username) {
		return <div className={isBig ? 'size-8' : 'size-5'} />;
	}

	return (
		<a
			className={`
				inline-flex items-center text-ink-soft no-underline transition
				hover:text-ink
				${isBig ? `gap-2 text-base` : `gap-1.5 text-xs`}
			`}
			href='https://jurien.dev'
			rel='noopener noreferrer'
			target='_blank'
		>
			<span>
				With <span className='mx-1'>❤️</span> by
			</span>
			{avatarUrl && (
				<img
					alt={username}
					className='rounded-full'
					height={isBig ? 32 : 20}
					src={avatarUrl}
					width={isBig ? 32 : 20}
				/>
			)}
			<span>{username}</span>
		</a>
	);
}
