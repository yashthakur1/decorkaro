import React, { useState } from "react";
import { useModals } from "../ModalContext";

const QUESTIONS = [
	{ key: "home", label: "Home size", options: ["1 BHK", "2 BHK", "3 BHK", "3+ BHK"] },
	{ key: "purpose", label: "What's it for?", options: ["Moving in", "Renting out", "Renovating"] },
	{ key: "property", label: "Property type", options: ["Residential", "Commercial"] },
	{ key: "budget", label: "Budget", options: ["₹5–10 lakh", "₹10–20 lakh", "₹20–50 lakh", "₹50 lakh+"] },
] as const;

type Answers = Partial<Record<(typeof QUESTIONS)[number]["key"], string>>;

const EstimatorSection: React.FC = () => {
	const { openEstimate } = useModals();
	const [answers, setAnswers] = useState<Answers>({});
	const answered = QUESTIONS.filter((q) => answers[q.key]).length;
	const complete = answered === QUESTIONS.length;

	return (
		<section id="estimate" className="bg-limestone py-20 md:py-28">
			<div className="page grid gap-12 lg:grid-cols-12">
				<div className="lg:col-span-4">
					<h2 className="display text-h2">Start your estimate</h2>
					<p className="mt-6 max-w-measure text-slate">
						Answer four quick questions and we'll prepare a personalised estimate. A designer follows up within 24
						hours.
					</p>
				</div>

				<div className="border border-rule bg-white p-6 sm:p-8 lg:col-span-7 lg:col-start-6">
					<div className="space-y-8">
						{QUESTIONS.map((q) => (
							<fieldset key={q.key}>
								<legend className="mb-3 text-small font-semibold">{q.label}</legend>
								<div className="flex flex-wrap gap-2">
									{q.options.map((opt) => {
										const on = answers[q.key] === opt;
										return (
											<button
												key={opt}
												type="button"
												aria-pressed={on}
												onClick={() => setAnswers((a) => ({ ...a, [q.key]: opt }))}
												className={on ? "chip-on" : "chip-off"}
											>
												{opt}
											</button>
										);
									})}
								</div>
							</fieldset>
						))}
					</div>

					<div className="mt-10 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
						<p className="text-small text-slate" aria-live="polite">
							{complete ? "All set. Send us your details next." : `${answered} of ${QUESTIONS.length} answered`}
						</p>
						<button onClick={openEstimate} disabled={!complete} className="btn-primary">
							Get my free estimate
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EstimatorSection;
