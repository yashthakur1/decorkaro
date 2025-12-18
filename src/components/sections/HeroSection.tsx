import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import GoogleFormModal from "../GoogleFormModal";

// Hero images stored in /public/images/hero/ folder
// To update images, simply replace the files in that folder:
// - hero-1.jpg
// - hero-2.jpg
// - hero-3.jpg
const heroImages = [
	"/images/hero/hero-1.jpg",
	"/images/hero/hero-2.jpg",
	"/images/hero/hero-3.jpg",
];

const HeroSection: React.FC = () => {
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const stats = [
		{ value: "500+", label: "Projects Completed" },
		{ value: "98%", label: "Happy Clients" },
		{ value: "10+", label: "Years Experience" },
	];

	// Auto-rotate images every 4 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative min-h-screen bg-[#FAF9F6] overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl" />
			<div className="absolute bottom-40 right-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />

			<div className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 lg:pt-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="order-2 lg:order-1"
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-700 px-4 py-2 rounded-full mb-6"
						>
							<Star size={16} className="fill-yellow-500 text-yellow-500" />
							<span className="text-sm font-medium">
								Top Rated Interior Design Studio
							</span>
						</motion.div>

						{/* Headline */}
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="font-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight mb-6"
						>
							Make Your Interior More{" "}
							<span className="text-yellow-500 relative">
								Minimalistic
								<svg
									className="absolute -bottom-2 left-0 w-full"
									viewBox="0 0 200 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 10C50 4 150 4 198 10"
										stroke="#EAB308"
										strokeWidth="3"
										strokeLinecap="round"
									/>
								</svg>
							</span>{" "}
							& Modern
						</motion.h1>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="font-secondary text-slate-600 text-lg md:text-xl mb-8 max-w-lg"
						>
							Turn your room into a lot more beautiful and modern with the best interior
							design. We create spaces that reflect your personality.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="flex flex-col sm:flex-row gap-4 mb-12"
						>
							<button
								onClick={() => setIsFormModalOpen(true)}
								className="group bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
							>
								Get Free Estimate
								<ArrowRight
									size={20}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</button>
							<a
								href="#portfolio"
								className="bg-transparent hover:bg-slate-100 border-2 border-slate-300 text-slate-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-center"
							>
								View Our Work
							</a>
						</motion.div>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="flex flex-wrap gap-8 md:gap-12"
						>
							{stats.map((stat, index) => (
								<div key={index} className="text-center sm:text-left">
									<p className="font-title text-3xl md:text-4xl font-bold text-slate-900">
										{stat.value}
									</p>
									<p className="font-secondary text-slate-500 text-sm">{stat.label}</p>
								</div>
							))}
						</motion.div>
					</motion.div>

					{/* Right Content - Image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
						className="order-1 lg:order-2 relative"
					>
						{/* Main Image Container */}
						<div className="relative">
							{/* Background Shape */}
							<div className="absolute -top-8 -right-8 w-full h-full bg-yellow-400 rounded-[2rem] lg:rounded-[3rem]" />

							{/* Main Image with Crossfade */}
							<div className="relative z-10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[600px]">
								<AnimatePresence mode="wait">
									<motion.img
										key={currentImageIndex}
										src={heroImages[currentImageIndex]}
										alt="Modern minimalist interior design"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.8, ease: "easeInOut" }}
										className="absolute inset-0 w-full h-full object-cover"
									/>
								</AnimatePresence>
							</div>

							{/* Image Indicators */}
							<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
								{heroImages.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`w-2 h-2 rounded-full transition-all duration-300 ${
											index === currentImageIndex
												? "bg-white w-6"
												: "bg-white/50 hover:bg-white/75"
										}`}
										aria-label={`Go to image ${index + 1}`}
									/>
								))}
							</div>

							{/* Floating Card */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.8 }}
								className="absolute -bottom-6 -left-6 md:-left-12 z-20 bg-white rounded-2xl p-4 md:p-6 shadow-xl"
							>
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-xl flex items-center justify-center">
										<svg
											className="w-6 h-6 md:w-8 md:h-8 text-slate-900"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
									</div>
									<div>
										<p className="font-title font-bold text-slate-900 text-lg md:text-xl">
											500+
										</p>
										<p className="font-secondary text-slate-500 text-sm">Projects Done</p>
									</div>
								</div>
							</motion.div>

							{/* Small Decorative Image */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 1 }}
								className="absolute -top-4 -left-4 md:-top-8 md:-left-8 z-20 hidden md:block"
							>
								<div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
									<AnimatePresence mode="wait">
										<motion.img
											key={currentImageIndex}
											src={heroImages[(currentImageIndex + 1) % heroImages.length]}
											alt="Interior detail"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.8, ease: "easeInOut" }}
											className="w-full h-full object-cover"
										/>
									</AnimatePresence>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Google Form Modal */}
			<GoogleFormModal
				isOpen={isFormModalOpen}
				onClose={() => setIsFormModalOpen(false)}
			/>
		</section>
	);
};

export default HeroSection;
