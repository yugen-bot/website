import Hero from './hero';

export default function NotFound() {
	return (
		<main className='relative overflow-hidden px-4 pt-12 pb-16'>
			<Hero />
			<section className='mx-auto mt-16 max-w-xl text-center'>
				<p className='text-8xl font-bold text-brand-600 opacity-30'>404</p>
				<h2 className='mt-4 font-serif text-3xl font-semibold text-ink'>
					Page not found
				</h2>
				<p className='mt-3 text-lg text-ink-soft'>
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<a
					className='
						mt-8 inline-flex items-center rounded-full bg-brand-600 px-6 py-3
						font-medium text-white no-underline transition
						hover:bg-brand-700
						focus-visible:ring-2 focus-visible:ring-brand-500
						focus-visible:outline-none
					'
					href='/'
				>
					Back to home
				</a>
			</section>
		</main>
	);
}
