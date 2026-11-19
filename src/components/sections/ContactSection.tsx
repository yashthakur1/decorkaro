import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2 } from "lucide-react";
import { CONTACT, HOME_PACKAGES } from "../../data/site";

const SERVICE_OPTIONS = [...HOME_PACKAGES.map((p) => `${p.name} home`), "Modular kitchen", "Commercial project", "Other"];
const BUDGETS = ["Below ₹5 lakh", "₹5–10 lakh", "₹10–20 lakh", "₹20–50 lakh", "Above ₹50 lakh"];

const ContactForm: React.FC<{ formId: string }> = ({ formId }) => {
	const [state, handleSubmit] = useForm(formId);

	if (state.succeeded) {
		return (
			<div className="flex flex-col items-start py-10" role="status">
				<CheckCircle2 className="text-brass" size={32} aria-hidden />
				<h3 className="mt-4 text-h4 font-semibold">Request received</h3>
				<p className="mt-2 text-small text-slate">A designer will call you within 24 hours to book your consultation.</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
			<div>
				<label htmlFor="name" className="field-label">Full name</label>
				<input id="name" name="name" required autoComplete="name" className="field" />
				<ValidationError field="name" errors={state.errors} className="mt-1 text-micro text-red-700" />
			</div>
			<div>
				<label htmlFor="phone" className="field-label">Phone</label>
				<input id="phone" name="phone" type="tel" required autoComplete="tel" className="field" />
				<ValidationError field="phone" errors={state.errors} className="mt-1 text-micro text-red-700" />
			</div>
			<div className="sm:col-span-2">
				<label htmlFor="email" className="field-label">Email</label>
				<input id="email" name="email" type="email" required autoComplete="email" className="field" />
				<ValidationError field="email" errors={state.errors} className="mt-1 text-micro text-red-700" />
			</div>
			<div>
				<label htmlFor="serviceType" className="field-label">Project</label>
				<select id="serviceType" name="serviceType" required className="field" defaultValue="">
					<option value="" disabled>Choose one</option>
					{SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
				</select>
			</div>
			<div>
				<label htmlFor="budget" className="field-label">Budget (optional)</label>
				<select id="budget" name="budget" className="field" defaultValue="">
					<option value="">Not sure yet</option>
					{BUDGETS.map((o) => <option key={o}>{o}</option>)}
				</select>
			</div>
			<div className="sm:col-span-2">
				<label htmlFor="message" className="field-label">About your project (optional)</label>
				<textarea id="message" name="message" rows={4} className="field resize-y" placeholder="Location, timeline, rooms you want done…" />
				<ValidationError field="message" errors={state.errors} className="mt-1 text-micro text-red-700" />
			</div>
			<div className="sm:col-span-2">
				<button type="submit" disabled={state.submitting} className="btn-primary w-full sm:w-auto">
					{state.submitting ? "Sending…" : "Book a consultation"}
				</button>
				<ValidationError errors={state.errors} className="mt-2 text-micro text-red-700" />
			</div>
		</form>
	);
};

const ContactSection: React.FC = () => {
	const formId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

	return (
		<section id="contact" className="border-t border-rule bg-limestone py-20 md:py-28">
			<div className="page grid gap-14 lg:grid-cols-12">
				<div className="lg:col-span-5">
					<h2 className="display text-h2">Visit the studio or book a consultation</h2>
					<p className="mt-6 max-w-measure text-slate">
						Consultations are free and there's no obligation. Bring your floor plan, or we'll come to you.
					</p>

					<dl className="mt-10 border-t border-rule text-small">
						<div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4">
							<dt className="text-slate">Studio</dt>
							<dd>
								{CONTACT.address.map((l) => <span key={l} className="block">{l}</span>)}
								<a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-brass-dark underline-offset-4 hover:underline">
									Get directions
								</a>
							</dd>
						</div>
						<div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4">
							<dt className="text-slate">Phone</dt>
							<dd><a href={CONTACT.phoneHref} className="font-semibold hover:text-brass-dark">{CONTACT.phone}</a></dd>
						</div>
						<div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4">
							<dt className="text-slate">WhatsApp</dt>
							<dd><a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-brass-dark">Message us</a></dd>
						</div>
						<div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4">
							<dt className="text-slate">Email</dt>
							<dd><a href={`mailto:${CONTACT.email}`} className="break-all font-semibold hover:text-brass-dark">{CONTACT.email}</a></dd>
						</div>
						<div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4">
							<dt className="text-slate">Hours</dt>
							<dd className="space-y-1">
								{CONTACT.hours.map((h) => (
									<span key={h.days} className="flex justify-between gap-4">
										<span>{h.days}</span>
										<span className="tabular-nums text-slate">{h.time}</span>
									</span>
								))}
							</dd>
						</div>
					</dl>
				</div>

				<div className="border border-rule bg-white p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
					<h3 className="text-h4 font-semibold">Book a consultation</h3>
					<p className="mt-1 mb-8 text-small text-slate">We'll call you back within 24 hours.</p>
					{formId ? (
						<ContactForm formId={formId} />
					) : (
						<p className="text-small text-slate">
							Online booking is being set up. Call us on{" "}
							<a href={CONTACT.phoneHref} className="font-semibold text-marquina">{CONTACT.phone}</a> instead.
						</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
