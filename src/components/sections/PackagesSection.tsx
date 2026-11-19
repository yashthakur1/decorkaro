import React from "react";
import { Check } from "lucide-react";
import { useModals } from "../ModalContext";
import { HOME_PACKAGES, OTHER_SERVICES } from "../../data/site";
import SectionHeading from "../SectionHeading";

const PackagesSection: React.FC = () => {
	const { openEstimate } = useModals();

	return (
		<section id="packages" className="py-20 md:py-28">
			<div className="page">
				<SectionHeading
					title="Fixed-price home packages"
					intro="Each package covers design, manufacturing and installation. You see the full 3D design and an itemised estimate before anything is built."
				/>

				{/* Comparison: one column per home size, rows read across */}
				<div className="mt-14 grid border-t border-marquina sm:grid-cols-2 lg:grid-cols-4">
					{HOME_PACKAGES.map((p, i) => (
						<article
							key={p.name}
							className={`flex flex-col border-b border-rule py-8 sm:px-6 lg:border-b-0 ${
								i % 2 ? "sm:border-l" : "sm:pl-0"
							} ${i > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0"} border-rule`}
						>
							<h3 className="display text-h3">{p.name}</h3>
							<p className="mt-1 text-small text-slate">{p.summary}</p>
							<p className="mt-6 text-micro text-slate">Starting at</p>
							<p className="display text-[2rem] leading-none text-marquina">{p.price}</p>
							<ul className="mt-6 space-y-2.5 border-t border-rule pt-6 text-small">
								{p.includes.map((item) => (
									<li key={item} className="flex gap-2.5">
										<Check size={16} className="mt-[3px] flex-none text-brass" aria-hidden />
										{item}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>

				<div className="mt-px grid border-y border-rule md:grid-cols-2">
					{OTHER_SERVICES.map((s, i) => (
						<div key={s.name} className={`py-7 ${i ? "border-t border-rule md:border-l md:border-t-0 md:pl-6" : ""}`}>
							<div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
								<h3 className="text-h4 font-semibold">{s.name}</h3>
								<span className="text-small font-semibold text-brass-dark">{s.price}</span>
							</div>
							<p className="mt-2 max-w-measure text-small text-slate">{s.summary}</p>
						</div>
					))}
				</div>

				<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="max-w-measure text-micro text-slate">
						Starting prices. The final cost depends on your layout, carpet area and finish level (Essentials,
						Premium or Luxe).
					</p>
					<button onClick={openEstimate} className="btn-primary flex-none">
						Get an estimate for your home
					</button>
				</div>
			</div>
		</section>
	);
};

export default PackagesSection;
