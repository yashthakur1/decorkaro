import React from "react";
import { TESTIMONIALS } from "../../data/site";

const TestimonialsSection: React.FC = () => (
	<section id="testimonials" className="py-20 md:py-28">
		<div className="page">
			<h2 className="display text-h2">What clients say</h2>
			<div className="mt-14 grid gap-x-12 md:grid-cols-2">
				{TESTIMONIALS.map((t) => (
					<figure key={t.name} className="border-t border-rule py-10">
						<blockquote className="text-h4 font-normal leading-relaxed text-marquina">“{t.quote}”</blockquote>
						<figcaption className="mt-6 text-small">
							<span className="font-semibold">{t.name}</span>
							<span className="text-slate">, {t.role}</span>
						</figcaption>
					</figure>
				))}
			</div>
		</div>
	</section>
);

export default TestimonialsSection;
