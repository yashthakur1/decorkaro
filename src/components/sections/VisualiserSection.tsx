import React, { useState } from "react";
import { Play } from "lucide-react";
import { useModals } from "../ModalContext";
import Dialog from "../Dialog";

const STEPS = [
	{ title: "Upload", body: "A floor plan drawing, or a photo of an empty room." },
	{ title: "Generate", body: "Floor plans become a furnished 3D view. Room photos are restyled with new finishes and furniture." },
	{ title: "Refine", body: "Open any room, try another style, or describe a change in your own words." },
];

const VisualiserSection: React.FC = () => {
	const { openPlanner } = useModals();
	const [videoOpen, setVideoOpen] = useState(false);

	return (
		<section id="visualiser" className="bg-marquina py-20 text-white md:py-28">
			<div className="page grid items-center gap-14 lg:grid-cols-12">
				<div className="lg:col-span-5">
					<h2 className="display text-h2">See your home furnished before you spend anything.</h2>
					<p className="mt-6 max-w-measure text-white/70">
						Our AI visualiser turns your floor plan or room photo into a realistic design in about a minute. It's
						free, needs no sign-up, and gives you something concrete to bring to your consultation.
					</p>

					<ol className="mt-10 border-t border-marquina-line">
						{STEPS.map((s, i) => (
							<li key={s.title} className="grid grid-cols-[2.5rem_1fr] border-b border-marquina-line py-5">
								<span className="display text-brass-light" aria-hidden>
									{i + 1}
								</span>
								<div>
									<p className="font-semibold">{s.title}</p>
									<p className="mt-1 text-small text-white/65">{s.body}</p>
								</div>
							</li>
						))}
					</ol>

					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						<button onClick={openPlanner} className="btn-brass">
							Try the AI visualiser
						</button>
						<button onClick={() => setVideoOpen(true)} className="btn-ghost-light">
							<Play size={16} aria-hidden /> Watch how it works
						</button>
					</div>
				</div>

				<div className="lg:col-span-7">
					<button
						onClick={() => setVideoOpen(true)}
						className="group relative block w-full overflow-hidden border border-marquina-line"
						aria-label="Play the AI visualiser walkthrough video"
					>
						<video
							className="aspect-video w-full object-cover"
							poster="/video-ref/poster.jpg"
							autoPlay
							loop
							muted
							playsInline
							preload="metadata"
						>
							<source src="/video-ref/explainer.mp4" type="video/mp4" />
						</video>
						<span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded bg-marquina/80 px-3.5 py-2 text-micro font-semibold backdrop-blur transition-colors group-hover:bg-brass">
							<Play size={14} aria-hidden /> Play with sound
						</span>
					</button>
				</div>
			</div>

			<Dialog isOpen={videoOpen} onClose={() => setVideoOpen(false)} title="AI visualiser walkthrough" size="xl">
				<div className="flex h-full items-center bg-marquina">
					<video className="max-h-full w-full" poster="/video-ref/poster.jpg" controls autoPlay playsInline>
						<source src="/video-ref/explainer.mp4" type="video/mp4" />
					</video>
				</div>
			</Dialog>
		</section>
	);
};

export default VisualiserSection;
