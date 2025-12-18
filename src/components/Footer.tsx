import React from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-slate-900 text-white pt-16 pb-8">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div>
						<img
							src="/images/dk-logo.png"
							alt="DecorKaro"
							className="h-12 w-auto mb-4 brightness-0 invert"
						/>
						<p className="text-slate-400 mb-6 font-secondary">
							Transform your home with affordable modular interior packages. Choose from
							Essentials, Premium & Luxe packages. Serving Thane and across India.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://www.instagram.com/decorkaro.official/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-yellow-500 transition-colors"
							>
								<Instagram size={20} />
							</a>
							<a href="#" className="text-white hover:text-yellow-500 transition-colors">
								<Facebook size={20} />
							</a>
							<a href="#" className="text-white hover:text-yellow-500 transition-colors">
								<Twitter size={20} />
							</a>
						</div>
					</div>

					<div>
						<h4 className="font-title font-semibold text-lg mb-4">Quick Links</h4>
						<ul className="space-y-2 font-secondary">
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="#portfolio"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									Portfolio
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-title font-semibold text-lg mb-4">Services</h4>
						<ul className="space-y-2 font-secondary">
							<li>
								<a
									href="#services"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									1BHK Package
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									2BHK Package
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									3BHK Package
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									4BHK Package
								</a>
							</li>
							<li>
								<a
									href="#services"
									className="text-slate-400 hover:text-yellow-500 transition-colors"
								>
									Modular Kitchen
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-title font-semibold text-lg mb-4">Get in Touch</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{/* Our Location */}
							<div className="flex items-start">
								<MapPin size={20} className="mr-3 text-yellow-500 flex-shrink-0 mt-1" />
								<div>
									<h5 className="font-title font-medium text-white mb-1">Our Location</h5>
									<p className="text-slate-400 font-secondary text-sm">
										Decorkaro, Sai Baba Mandir,
										<br />
										Behind Pipeline road, Kalher,
										<br />
										Thane, India, 421302
									</p>
								</div>
							</div>

							{/* Call Us */}
							<div className="flex items-start">
								<Phone size={20} className="mr-3 text-yellow-500 flex-shrink-0 mt-1" />
								<div>
									<h5 className="font-title font-medium text-white mb-1">Call Us</h5>
									<a
										href="tel:+919930845311"
										className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary text-sm"
									>
										+91 99308 45311
									</a>
								</div>
							</div>

							{/* Email Us */}
							<div className="flex items-start">
								<Mail size={20} className="mr-3 text-yellow-500 flex-shrink-0 mt-1" />
								<div>
									<h5 className="font-title font-medium text-white mb-1">Email Us</h5>
									<a
										href="mailto:decorkaro.india@gmail.com"
										className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary text-sm"
									>
										decorkaro.india@gmail.com
									</a>
								</div>
							</div>

							{/* WhatsApp */}
							<div className="flex items-start">
								<svg
									className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-1"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
								</svg>
								<div>
									<h5 className="font-title font-medium text-white mb-1">WhatsApp</h5>
									<a
										href="https://wa.me/919930845311"
										className="text-slate-400 hover:text-yellow-500 transition-colors font-secondary text-sm"
									>
										+91 99308 45311
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
					<p>
						&copy; {new Date().getFullYear()} DecorKaro Interior Design. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
