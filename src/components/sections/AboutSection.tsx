import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const AboutSection: React.FC = () => {
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: (custom: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: custom * 0.2, duration: 0.6 },
		}),
	};

	return (
		<section id="about" className="py-20 bg-white">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Image with Decorative Elements */}
					<motion.div
						className="relative"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						custom={0}
						variants={fadeIn}
					>
						<div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
							<img
								src="/images/about/about-us.png"
								alt="Interior Designer at work"
								className="w-full h-auto object-cover"
							/>
						</div>
						<div className="absolute -bottom-8 -right-8 w-48 h-48 bg-yellow-500 rounded-xl -z-10"></div>
						<div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-slate-900 rounded-xl -z-10"></div>
					</motion.div>

					{/* Right Column - Content */}
					<div>
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
							custom={1}
							variants={fadeIn}
						>
							<p className="text-yellow-500 font-medium font-secondary">ABOUT US</p>
							<h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
								Transforming Spaces Into Living Art Since 2010
							</h2>
							<p className="text-slate-700 mb-6 font-secondary">
								DecorKaro is a premier interior design studio based in Thane with a
								passion for creating luxurious, functional, and aesthetically pleasing
								spaces across India. With over a decade of experience in the industry,
								we've successfully completed 500+ projects spanning residential,
								commercial, and hospitality designs.
							</p>
							<p className="text-slate-700 mb-8 font-secondary">
								Our team of expert designers brings a perfect blend of creativity,
								technical knowledge, and market trends to deliver personalized design
								solutions that reflect your style, needs, and aspirations.
							</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
								<div className="flex items-start">
									<CheckCircle
										className="text-yellow-500 mr-3 flex-shrink-0 mt-1"
										size={20}
									/>
									<p className="text-slate-700 font-secondary">
										Expert Design Consultations
									</p>
								</div>
								<div className="flex items-start">
									<CheckCircle
										className="text-yellow-500 mr-3 flex-shrink-0 mt-1"
										size={20}
									/>
									<p className="text-slate-700 font-secondary">
										Project Management Excellence
									</p>
								</div>
								<div className="flex items-start">
									<CheckCircle
										className="text-yellow-500 mr-3 flex-shrink-0 mt-1"
										size={20}
									/>
									<p className="text-slate-700 font-secondary">
										Customized Interior Solutions
									</p>
								</div>
								<div className="flex items-start">
									<CheckCircle
										className="text-yellow-500 mr-3 flex-shrink-0 mt-1"
										size={20}
									/>
									<p className="text-slate-700 font-secondary">
										Timely Delivery & Transparency
									</p>
								</div>
							</div>

							<a
								href="#services"
								className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
							>
								Discover Our Services
							</a>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
