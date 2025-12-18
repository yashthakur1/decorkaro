import React from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

interface FormInputs {
	name: string;
	email: string;
	phone: string;
	serviceType: string;
	budget: string;
	message: string;
}

const ContactSection: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
		alert("Thank you for your inquiry! We will contact you soon.");
		reset();
	};

	return (
		<section id="contact" className="py-20 bg-slate-900 text-white">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
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

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Contact Form */}
					<motion.div
						className="bg-white text-slate-900 rounded-xl p-8 shadow-lg"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<h3 className="font-title text-2xl font-bold mb-6">Book a Consultation</h3>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
										className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
											errors.name ? "border-red-500" : "border-slate-300"
										}`}
										placeholder="John Doe"
										{...register("name", { required: "Name is required" })}
									/>
									{errors.name && (
										<p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
									)}
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
										className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
											errors.email ? "border-red-500" : "border-slate-300"
										}`}
										placeholder="john@example.com"
										{...register("email", {
											required: "Email is required",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: "Invalid email address",
											},
										})}
									/>
									{errors.email && (
										<p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
									)}
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
										className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
											errors.phone ? "border-red-500" : "border-slate-300"
										}`}
										placeholder="+91 99308 45311"
										{...register("phone", { required: "Phone number is required" })}
									/>
									{errors.phone && (
										<p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
									)}
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
										className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
											errors.serviceType ? "border-red-500" : "border-slate-300"
										}`}
										{...register("serviceType", { required: "Please select a service" })}
									>
										<option value="">Select a service</option>
										<option value="residential">Residential Design</option>
										<option value="commercial">Commercial Design</option>
										<option value="retail">Retail Design</option>
										<option value="hospitality">Hospitality Design</option>
										<option value="renovation">Renovation</option>
									</select>
									{errors.serviceType && (
										<p className="mt-1 text-sm text-red-500">
											{errors.serviceType.message}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="budget"
										className="block text-sm font-medium text-slate-700 mb-1"
									>
										Budget Range
									</label>
									<select
										id="budget"
										className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
										{...register("budget")}
									>
										<option value="">Select budget range</option>
										<option value="below-5-lacs">Below ₹5 Lakhs</option>
										<option value="5-10-lacs">₹5 - ₹10 Lakhs</option>
										<option value="10-20-lacs">₹10 - ₹20 Lakhs</option>
										<option value="20-50-lacs">₹20 - ₹50 Lakhs</option>
										<option value="above-50-lacs">Above ₹50 Lakhs</option>
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
										rows={4}
										className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
										placeholder="Tell us about your project and requirements..."
										{...register("message")}
									></textarea>
								</div>
							</div>

							<button
								type="submit"
								className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-md transition-colors duration-300"
							>
								Submit Inquiry
							</button>
						</form>
					</motion.div>

					{/* Contact Information */}
					<motion.div
						className="space-y-8"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
					>
						<div>
							<h3 className="font-serif text-2xl font-bold mb-6">Get in Touch</h3>
							<div className="space-y-6">
								<div className="flex items-start">
									<MapPin size={24} className="text-yellow-500 mr-4 flex-shrink-0 mt-1" />
									<div>
										<h4 className="font-medium text-lg mb-1">Our Location</h4>
										<p className="text-slate-400 font-secondary">
											Decorkaro, Sai Baba Mandir,
											<br />
											Behind Pipeline road, Kalher,
											<br />
											Thane, India, 421302
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<Phone size={24} className="text-yellow-500 mr-4 flex-shrink-0 mt-1" />
									<div>
										<h4 className="font-title font-medium text-lg mb-1">Call Us</h4>
										<p className="text-slate-400 font-secondary">
											<a
												href="tel:+919930845311"
												className="hover:text-yellow-500 transition-colors"
											>
												+91 99308 45311
											</a>
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<Mail size={24} className="text-yellow-500 mr-4 flex-shrink-0 mt-1" />
									<div>
										<h4 className="font-title font-medium text-lg mb-1">Email Us</h4>
										<p className="text-slate-400 font-secondary">
											<a
												href="mailto:decorkaro.india@gmail.com"
												className="hover:text-yellow-500 transition-colors"
											>
												decorkaro.india@gmail.com
											</a>
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<MessageSquare
										size={24}
										className="text-yellow-500 mr-4 flex-shrink-0 mt-1"
									/>
									<div>
										<h4 className="font-title font-medium text-lg mb-1">WhatsApp</h4>
										<p className="text-slate-400 font-secondary">
											<a
												href="https://wa.me/919930845311"
												className="hover:text-yellow-500 transition-colors"
											>
												+91 99308 45311
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h3 className="font-title text-2xl font-bold mb-6">Business Hours</h3>
							<ul className="space-y-3">
								<li className="flex justify-between">
									<span className="text-slate-400 font-secondary">Monday - Friday</span>
									<span>10:00 AM - 7:00 PM</span>
								</li>
								<li className="flex justify-between">
									<span className="text-slate-400 font-secondary">Saturday</span>
									<span>10:00 AM - 5:00 PM</span>
								</li>
								<li className="flex justify-between">
									<span className="text-slate-400 font-secondary">Sunday</span>
									<span>By Appointment Only</span>
								</li>
							</ul>
						</div>

						<div className="bg-slate-800 p-8 rounded-xl">
							<h3 className="font-title text-xl font-bold mb-4">
								Free Design Consultation
							</h3>
							<p className="text-slate-400 mb-4 font-secondary">
								Book a no-obligation consultation with our expert designers to discuss
								your project.
							</p>
							<ul className="space-y-3 mb-6">
								<li className="flex items-start">
									<div className="bg-yellow-500 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
										<span className="text-xs font-bold">✓</span>
									</div>
									<span className="font-secondary">
										Personalized design recommendations
									</span>
								</li>
								<li className="flex items-start">
									<div className="bg-yellow-500 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
										<span className="text-xs font-bold">✓</span>
									</div>
									<span className="font-secondary">Budget planning assistance</span>
								</li>
								<li className="flex items-start">
									<div className="bg-yellow-500 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
										<span className="text-xs font-bold">✓</span>
									</div>
									<span className="font-secondary">Material and finish suggestions</span>
								</li>
							</ul>
							<a
								href="tel:+919930845311"
								className="inline-flex items-center font-title font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
							>
								<Phone size={18} className="mr-2" />
								Call Now: +91 99308 45311
							</a>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
