import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle } from "lucide-react";

const ContactSection: React.FC = () => {
	const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
	const [state, handleSubmit] = useForm(formspreeId || "placeholder");
	const isFormConfigured = Boolean(formspreeId);

	return (
		<section id="contact" className="py-20 bg-slate-900 text-white">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-yellow-500 font-medium mb-2 font-secondary">CONTACT US</p>
					<h2 className="font-title text-3xl md:text-4xl font-bold mb-6">
						Let's Create Something Beautiful Together
					</h2>
					<p className="text-slate-400 font-secondary">
						Ready to transform your space? Get in touch with us to schedule a consultation
						or discuss your project requirements.
					</p>
				</motion.div>

				{/* Get in Touch - 2x2 Grid */}
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Our Location */}
						<div className="bg-slate-800 rounded-xl p-6">
							<div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
								<MapPin size={24} className="text-slate-900" />
							</div>
							<h4 className="font-title font-semibold text-lg mb-2">Our Location</h4>
							<p className="text-slate-400 font-secondary text-sm">
								Decorkaro, Sai Baba Mandir,
								<br />
								Behind Pipeline road, Kalher,
								<br />
								Thane, India, 421302
							</p>
						</div>

						{/* Call Us */}
						<div className="bg-slate-800 rounded-xl p-6">
							<div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
								<Phone size={24} className="text-slate-900" />
							</div>
							<h4 className="font-title font-semibold text-lg mb-2">Call Us</h4>
							<a
								href="tel:+919930845311"
								className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary text-sm"
							>
								+91 99308 45311
							</a>
						</div>

						{/* Email Us */}
						<div className="bg-slate-800 rounded-xl p-6">
							<div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
								<Mail size={24} className="text-slate-900" />
							</div>
							<h4 className="font-title font-semibold text-lg mb-2">Email Us</h4>
							<a
								href="mailto:decorkaro.india@gmail.com"
								className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary text-sm break-all"
							>
								decorkaro.india@gmail.com
							</a>
						</div>

						{/* WhatsApp */}
						<div className="bg-slate-800 rounded-xl p-6">
							<div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
								<MessageSquare size={24} className="text-slate-900" />
							</div>
							<h4 className="font-title font-semibold text-lg mb-2">WhatsApp</h4>
							<a
								href="https://wa.me/919930845311"
								className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary text-sm"
							>
								+91 99308 45311
							</a>
						</div>
					</div>
				</motion.div>

				{/* Form and Business Hours */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Contact Form - Takes 2 columns */}
					<motion.div
						className="lg:col-span-2 bg-white text-slate-900 rounded-xl p-6 md:p-8 shadow-lg"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<h3 className="font-title text-2xl font-bold mb-6">Book a Consultation</h3>

						{!isFormConfigured ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<p className="text-slate-600 font-secondary">
									Contact form is being configured. Please call us at{" "}
									<a href="tel:+919930845311" className="text-yellow-600 font-semibold hover:underline">
										+91 99308 45311
									</a>
								</p>
							</div>
						) : state.succeeded ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
									<CheckCircle className="w-8 h-8 text-green-500" />
								</div>
								<h4 className="font-title text-xl font-bold text-slate-900 mb-2">
									Thank You!
								</h4>
								<p className="text-slate-600 font-secondary">
									Your inquiry has been submitted successfully. We'll get back to you within 24 hours.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-slate-700 mb-1"
										>
											Full Name*
										</label>
										<input
											type="text"
											id="name"
											name="name"
											required
											className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
											placeholder="John Doe"
										/>
										<ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-sm text-red-500" />
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-slate-700 mb-1"
										>
											Email Address*
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
											placeholder="john@example.com"
										/>
										<ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-sm text-red-500" />
									</div>

									<div>
										<label
											htmlFor="phone"
											className="block text-sm font-medium text-slate-700 mb-1"
										>
											Phone Number*
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											required
											className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
											placeholder="+91 99308 45311"
										/>
										<ValidationError prefix="Phone" field="phone" errors={state.errors} className="mt-1 text-sm text-red-500" />
									</div>

									<div>
										<label
											htmlFor="serviceType"
											className="block text-sm font-medium text-slate-700 mb-1"
										>
											Service Type*
										</label>
										<select
											id="serviceType"
											name="serviceType"
											required
											className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
										>
											<option value="">Select a service</option>
											<option value="1BHK Package">1BHK Package</option>
											<option value="2BHK Package">2BHK Package</option>
											<option value="3BHK Package">3BHK Package</option>
											<option value="4BHK Package">4BHK Package</option>
											<option value="Modular Kitchen">Modular Kitchen</option>
											<option value="Commercial Design">Commercial Design</option>
										</select>
										<ValidationError prefix="Service Type" field="serviceType" errors={state.errors} className="mt-1 text-sm text-red-500" />
									</div>

									<div className="md:col-span-2">
										<label
											htmlFor="budget"
											className="block text-sm font-medium text-slate-700 mb-1"
										>
											Budget Range
										</label>
										<select
											id="budget"
											name="budget"
											className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
										>
											<option value="">Select budget range</option>
											<option value="Below ₹5 Lakhs">Below ₹5 Lakhs</option>
											<option value="₹5 - ₹10 Lakhs">₹5 - ₹10 Lakhs</option>
											<option value="₹10 - ₹20 Lakhs">₹10 - ₹20 Lakhs</option>
											<option value="₹20 - ₹50 Lakhs">₹20 - ₹50 Lakhs</option>
											<option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
										</select>
									</div>

									<div className="md:col-span-2">
										<label
											htmlFor="message"
											className="block text-sm font-medium text-slate-700 mb-1"
										>
											Message
										</label>
										<textarea
											id="message"
											name="message"
											rows={3}
											className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
											placeholder="Tell us about your project..."
										></textarea>
										<ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-sm text-red-500" />
									</div>
								</div>

								<button
									type="submit"
									disabled={state.submitting}
									className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-lg transition-colors duration-300"
								>
									{state.submitting ? "Submitting..." : "Submit Inquiry"}
								</button>
							</form>
						)}
					</motion.div>

					{/* Business Hours & CTA */}
					<motion.div
						className="space-y-6"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						{/* Business Hours */}
						<div className="bg-slate-800 rounded-xl p-6">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
									<Clock size={20} className="text-slate-900" />
								</div>
								<h3 className="font-title text-xl font-bold">Business Hours</h3>
							</div>
							<ul className="space-y-3">
								<li className="flex justify-between text-sm">
									<span className="text-slate-400 font-secondary">Mon - Fri</span>
									<span className="font-medium">10:00 AM - 7:00 PM</span>
								</li>
								<li className="flex justify-between text-sm">
									<span className="text-slate-400 font-secondary">Saturday</span>
									<span className="font-medium">10:00 AM - 5:00 PM</span>
								</li>
								<li className="flex justify-between text-sm">
									<span className="text-slate-400 font-secondary">Sunday</span>
									<span className="font-medium">By Appointment</span>
								</li>
							</ul>
						</div>

						{/* Free Consultation CTA */}
						<div className="bg-yellow-500 rounded-xl p-6 text-slate-900">
							<h3 className="font-title text-xl font-bold mb-3">
								Free Design Consultation
							</h3>
							<p className="text-slate-700 mb-4 font-secondary text-sm">
								Book a no-obligation consultation with our expert designers.
							</p>
							<ul className="space-y-2 mb-5">
								<li className="flex items-center gap-2 text-sm">
									<span className="w-5 h-5 bg-slate-900 text-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
										✓
									</span>
									<span className="font-secondary">Personalized recommendations</span>
								</li>
								<li className="flex items-center gap-2 text-sm">
									<span className="w-5 h-5 bg-slate-900 text-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
										✓
									</span>
									<span className="font-secondary">Budget planning assistance</span>
								</li>
								<li className="flex items-center gap-2 text-sm">
									<span className="w-5 h-5 bg-slate-900 text-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
										✓
									</span>
									<span className="font-secondary">Material suggestions</span>
								</li>
							</ul>
							<a
								href="tel:+919930845311"
								className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors text-sm"
							>
								<Phone size={18} />
								Call Now
							</a>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
