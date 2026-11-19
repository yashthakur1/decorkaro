import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useModals } from "../ModalContext";
import { FACTS } from "../../data/site";

const HERO_IMAGE = "/images/hero/94DADC0A-797C-4988-B43D-15EEDC5212E0.webp";

const HeroSection: React.FC = () => {
	const { openEstimate, openPlanner } = useModals();
	const reduce = useReducedMotion();
	// The page's one orchestrated moment: the headline block settles in once on load.
	const rise = (delay: number) =>
		reduce
			? {}
			: {
					initial: { opacity: 0, y: 18 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.7, delay, ease: [0.2, 0, 0, 1] },
				};

	return (
		<section id="top" className="relative flex min-h-[100svh] flex-col bg-marquina text-white">
			<img
				src={HERO_IMAGE}
				alt="Living room by DecorKaro with a marble feature wall, crystal chandelier and city view"
				className="absolute inset-0 h-full w-full object-cover"
				fetchPriority="high"
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(90deg, rgba(27,30,28,0.88) 0%, rgba(27,30,28,0.62) 42%, rgba(27,30,28,0.15) 75%), linear-gradient(0deg, rgba(27,30,28,0.92) 0%, rgba(27,30,28,0) 38%)",
				}}
				aria-hidden
			/>

			<div className="page relative flex flex-1 flex-col justify-end pb-10 pt-28 md:pb-14">
				<motion.h1 {...rise(0.05)} className="display max-w-[17ch] text-h1">
					Homes and workplaces, designed and built by one team.
				</motion.h1>
				<motion.p {...rise(0.2)} className="mt-7 max-w-[46ch] text-body text-white/80 md:text-[1.1875rem]">
					Interior design and turnkey fit-outs across Thane and Mumbai. Fixed-price packages from ₹3.62 lakh,
					with a free 3D design before you commit.
				</motion.p>
				<motion.div {...rise(0.32)} className="mt-9 flex flex-col gap-3 sm:flex-row">
					<button onClick={openEstimate} className="btn-brass">
						Get a free estimate
					</button>
					<button onClick={openPlanner} className="btn-ghost-light">
						Visualise your floor plan
					</button>
				</motion.div>
			</div>

			<div className="relative border-t border-white/15 bg-marquina/60 backdrop-blur-sm">
				<dl className="page grid grid-cols-2 md:grid-cols-4">
					{FACTS.map((f, i) => (
						<div
							key={f.label}
							className={`py-5 md:py-6 ${i % 2 ? "border-l border-white/15 pl-5" : ""} ${
								i > 0 ? "md:border-l md:border-white/15 md:pl-8" : ""
							} ${i > 1 ? "border-t border-white/15 md:border-t-0" : ""}`}
						>
							<dt className="sr-only">{f.label}</dt>
							<dd>
								<span className="display block text-[1.35rem] md:text-[1.6rem]">{f.value}</span>
								<span className="mt-1 block text-micro text-white/65">{f.label}</span>
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
};

export default HeroSection;
