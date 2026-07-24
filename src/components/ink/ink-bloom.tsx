import { useId } from 'react';

/**
 * A per-bot marbled ink current: an organic, feathered SVG bloom tinted with
 * the bot's accent. It drifts slowly while the bot is online and holds still,
 * desaturated, when offline. The drift animation is a compositor-only
 * transform and is disabled automatically under `prefers-reduced-motion`.
 */

interface InkBloomProps {
	accent: string;
	online: boolean;
	/** Vary the marbling + drift so no two currents move alike. */
	seed?: number;
	className?: string;
}

export default function InkBloom({
	accent,
	online,
	seed = 0,
	className,
}: InkBloomProps) {
	const id = useId().replaceAll(':', '');
	const filterId = `bloom-${id}`;

	return (
		<div
			aria-hidden='true'
			className={`
				pointer-events-none transition-[filter,opacity] duration-700
				${online ? (seed % 2 === 0 ? 'animate-drift' : 'animate-drift-slow') : ''}
				${online ? 'opacity-100' : 'opacity-60 grayscale-[0.85]'}
				${className ?? ''}
			`}
		>
			<svg
				className='size-full'
				preserveAspectRatio='xMidYMid slice'
				viewBox='0 0 200 200'
			>
				<defs>
					<filter
						height='180%'
						id={filterId}
						width='180%'
						x='-40%'
						y='-40%'
					>
						<feTurbulence
							baseFrequency='0.013 0.02'
							numOctaves={2}
							result='noise'
							seed={seed * 7 + 3}
							type='fractalNoise'
						/>
						<feDisplacementMap
							in='SourceGraphic'
							in2='noise'
							scale={70}
							xChannelSelector='R'
							yChannelSelector='G'
						/>
						<feGaussianBlur stdDeviation={6} />
					</filter>
				</defs>
				<g filter={`url(#${filterId})`}>
					<ellipse
						cx={100}
						cy={98}
						fill={accent}
						opacity={0.3}
						rx={62}
						ry={54}
					/>
					<ellipse
						cx={110}
						cy={90}
						fill={accent}
						opacity={0.2}
						rx={46}
						ry={58}
					/>
					<ellipse
						cx={92}
						cy={108}
						fill={accent}
						opacity={0.14}
						rx={70}
						ry={44}
					/>
				</g>
			</svg>
		</div>
	);
}
