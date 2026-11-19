import React from "react";
import SectionHeading from "../SectionHeading";
import { COMMITMENTS, PROCESS } from "../../data/site";

const ProcessSection: React.FC = () => (
	<section id="process" className="py-20 md:py-28">
		<div className="page">
			<SectionHeading
				title="How a project runs"
				intro="One team handles your project from the first visit to the day you move in, so there's a single point of contact and a single price."
			/>

			<ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
				{PROCESS.map((p, i) => (
					<li key={p.title} className="border-t border-marquina pb-10 pt-6">
						<span className="display text-[2.4rem] leading-none text-brass" aria-hidden>
							{String(i + 1).padStart(2, "0")}
						</span>
						<h3 className="mt-5 text-h4 font-semibold">{p.title}</h3>
						<p className="mt-2 text-small text-slate">{p.body}</p>
					</li>
				))}
			</ol>

			<div id="about" className="mt-16 grid items-center gap-12 border-t border-rule pt-16 md:mt-20 lg:grid-cols-12">
				<figure className="lg:col-span-6">
					<img
						src="/images/about/about-us.webp"
						alt="The DecorKaro design team reviewing plans in the studio"
						loading="lazy"
						className="aspect-[4/3] w-full object-cover"
					/>
					<figcaption className="mt-3 text-micro text-slate">The design team at the Thane studio.</figcaption>
				</figure>
				<div className="lg:col-span-5 lg:col-start-8">
					<h3 className="display text-h3">A Thane studio, designing since 2010</h3>
					<p className="mt-5 text-slate">
						We've completed 500+ residential, commercial and hospitality projects across India. Our designers,
						project managers and installers work as one team, so what you approve in 3D is what gets built.
					</p>
					<dl className="mt-8 grid gap-x-8 sm:grid-cols-2">
						{COMMITMENTS.map((c) => (
							<div key={c.title} className="border-t border-rule py-5">
								<dt className="font-semibold">{c.title}</dt>
								<dd className="mt-1 text-small text-slate">{c.body}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	</section>
);

export default ProcessSection;
