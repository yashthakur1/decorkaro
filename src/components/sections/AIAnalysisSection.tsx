import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, X } from "lucide-react";
import AIRoomPlannerModal from "../AIRoomPlannerModal";

const AIAnalysisSection: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const modalVideoRef = useRef<HTMLVideoElement>(null);

	const handleOpenVideoModal = () => {
		setIsVideoModalOpen(true);
	};

	const handleCloseVideoModal = () => {
		setIsVideoModalOpen(false);
		if (modalVideoRef.current) {
			modalVideoRef.current.pause();
		}
	};

	return (
		<section id="ai-analysis" className="py-20 bg-slate-50">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-yellow-500 font-medium mb-2 font-secondary">
						AI-POWERED DESIGN
					</p>
					<h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
						Visualize Your Dream Space
					</h2>
					<p className="text-slate-700 font-secondary">
						Upload your floor plan or room photo and let our AI transform it into stunning
						interior visualizations
					</p>
				</motion.div>

				{/* Two Column Layout: Video + AI Tool CTA */}
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left: Video Explainer */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h3 className="font-title text-xl font-bold text-slate-900 mb-4">
							See How It Works
						</h3>
						<div
							className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 cursor-pointer group"
							onClick={handleOpenVideoModal}
						>
							<div className="relative aspect-video">
								{/* Looping Silent Video Preview */}
								<video
									className="w-full h-full object-cover"
									poster="/video-ref/poster.jpg"
									autoPlay
									loop
									muted
									playsInline
								>
									<source src="/video-ref/explainer.mp4" type="video/mp4" />
									<source src="/video-ref/explainer.webm" type="video/webm" />
									Your browser does not support the video tag.
								</video>

								{/* Play Button Overlay */}
								<div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
									<motion.div
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg group-hover:bg-yellow-400 transition-colors"
									>
										<Play
											className="w-6 h-6 md:w-8 md:h-8 text-slate-900 ml-1"
											fill="currentColor"
										/>
									</motion.div>
								</div>
							</div>
						</div>
						<p className="text-slate-500 text-sm mt-3 text-center font-secondary">
							Click to watch with sound
						</p>
					</motion.div>

					{/* Right: AI Tool CTA Card */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-200">
							<div className="flex items-center gap-4 mb-6">
								<div className="flex-shrink-0 flex items-center justify-center bg-yellow-100 rounded-full w-14 h-14">
									<Sparkles className="text-yellow-500" size={28} />
								</div>
								<div>
									<h3 className="font-title text-2xl font-bold text-slate-900">
										AI Room Visualizer
									</h3>
									<p className="text-slate-600 font-secondary">
										Transform your space instantly
									</p>
								</div>
							</div>

							<div className="space-y-4 mb-8">
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
										<span className="text-yellow-600 text-sm font-bold">1</span>
									</div>
									<p className="text-slate-700 font-secondary">
										Upload your floor plan or room photo
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
										<span className="text-yellow-600 text-sm font-bold">2</span>
									</div>
									<p className="text-slate-700 font-secondary">
										Our AI analyzes and generates a stunning 3D visualization
									</p>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
										<span className="text-yellow-600 text-sm font-bold">3</span>
									</div>
									<p className="text-slate-700 font-secondary">
										Edit and refine with conversational prompts
									</p>
								</div>
							</div>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setIsModalOpen(true)}
								className="w-full py-4 px-6 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-xl transition-colors flex items-center justify-center gap-3 text-lg"
							>
								<Sparkles size={22} />
								Try AI Visualizer
							</motion.button>

							<p className="text-slate-500 text-sm mt-4 text-center font-secondary">
								Free to try • No sign-up required
							</p>
						</div>
					</motion.div>
				</div>
			</div>

			{/* AI Room Planner Modal */}
			<AIRoomPlannerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

			{/* Video Modal */}
			<AnimatePresence>
				{isVideoModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80"
						onClick={handleCloseVideoModal}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="relative w-full max-w-5xl"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Close Button */}
							<button
								onClick={handleCloseVideoModal}
								className="absolute -top-10 right-0 md:-top-12 md:-right-12 p-2 text-white hover:text-yellow-400 transition-colors z-10"
								aria-label="Close video"
							>
								<X size={28} />
							</button>

							{/* Video Container */}
							<div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black">
								<div className="aspect-video">
									<video
										ref={modalVideoRef}
										className="w-full h-full object-contain"
										poster="/video-ref/poster.jpg"
										controls
										autoPlay
										playsInline
									>
										<source src="/video-ref/explainer.mp4" type="video/mp4" />
										<source src="/video-ref/explainer.webm" type="video/webm" />
										Your browser does not support the video tag.
									</video>
								</div>
							</div>

							{/* Video Title */}
							<p className="text-white text-center mt-4 font-secondary text-sm md:text-base">
								AI Room Visualizer - How It Works
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default AIAnalysisSection;
