import Hero from './hero';

export default function NotFound() {
	return (
		<main className='relative overflow-hidden px-4 pt-12 pb-16'>
			<Hero />
			<section className='mx-auto mt-8 max-w-xl text-center'>
				<p className='font-serif text-8xl font-bold text-ink-dilute opacity-40'>
					404
				</p>
				<h2 className='mt-4 font-serif text-3xl font-semibold text-sumi'>
					Nothing settled here
				</h2>
				<p className='mt-3 text-lg text-ink-current'>
					The page you&apos;re looking for doesn&apos;t exist or has drifted
					away.
				</p>
				<a
					className='
						mt-8 inline-flex items-center rounded-full bg-sumi px-6 py-3 font-medium
						text-paper no-underline transition duration-300 ease-out
						hover:-translate-y-0.5 hover:shadow-lift
						focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2
						focus-visible:ring-offset-paper focus-visible:outline-none
					'
					href='/'
				>
					Back to home
				</a>
			</section>
		</main>
	);
}
