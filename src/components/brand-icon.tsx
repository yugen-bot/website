import type { SimpleIcon } from 'simple-icons';

interface BrandIconProps {
	icon: SimpleIcon;
	size?: number;
	className?: string;
}

export default function BrandIcon({
	icon,
	size = 18,
	className,
}: BrandIconProps) {
	return (
		<svg
			aria-label={icon.title}
			className={className}
			fill='currentColor'
			height={size}
			role='img'
			viewBox='0 0 24 24'
			width={size}
		>
			<path d={icon.path} />
		</svg>
	);
}
