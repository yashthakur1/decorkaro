import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TestimonialsSection: React.FC = () => {
	const testimonials = [
		{
			id: 1,
			name: "Aarav Patel",
			position: "Homeowner",
			quote:
				"DecorKaro transformed our home beyond our expectations. Their attention to detail and commitment to understanding our lifestyle needs resulted in a space that feels both luxurious and perfectly comfortable.",
			rating: 5,
		},
		{
			id: 2,
			name: "Priya Sharma",
			position: "Restaurant Owner",
			quote:
				"Working with DecorKaro for our restaurant design was the best decision we made. The team created a unique ambiance that perfectly captures our brand essence, and our customers constantly compliment the space.",
			rating: 5,
		},
		{
			id: 3,
			name: "Vikram Malhotra",
			position: "CEO, TechVision India",
			quote:
				"Our office redesign by DecorKaro has significantly improved workplace morale and productivity. The team masterfully balanced aesthetics with functionality, creating a space that inspires innovation.",
			rating: 5,
		},
		{
			id: 4,
			name: "Anjali Desai",
			position: "Boutique Owner",
			quote:
				"The DecorKaro team understood exactly what my clothing boutique needed. The design has completely elevated the shopping experience, and sales have increased by 30% since the renovation.",
			rating: 5,
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoplay, setAutoplay] = useState(true);

	const nextTestimonial = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
		);
	};

	useEffect(() => {
		let interval: number | null = null;

		if (autoplay) {
			interval = window.setInterval(() => {
				nextTestimonial();
			}, 5000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [autoplay, testimonials.length]);

	return (
		<section id="testimonials" className="py-20 bg-[#FAF9F6]">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-yellow-500 font-medium mb-2 font-secondary">TESTIMONIALS</p>
					<h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
						What Our Clients Say
					</h2>
					<p className="text-slate-600 font-secondary">
						Don't just take our word for it. Here's what some of our satisfied clients
						have to say about their experience working with DecorKaro.
					</p>
				</motion.div>

				<div className="relative max-w-4xl mx-auto">
					{/* Testimonial Carousel */}
					<div
						className="overflow-hidden"
						onMouseEnter={() => setAutoplay(false)}
						onMouseLeave={() => setAutoplay(true)}
					>
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${currentIndex * 100}%)` }}
						>
							{testimonials.map((testimonial) => (
								<div key={testimonial.id} className="w-full flex-shrink-0 px-4">
									<div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
										{/* Quote Icon */}
										<div className="flex justify-center mb-6">
											<div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center">
												<Quote size={24} className="text-slate-900" fill="currentColor" />
											</div>
										</div>

										{/* Quote Text */}
										<blockquote className="text-center mb-8">
											<p className="text-slate-700 text-lg md:text-xl leading-relaxed font-secondary">
												"{testimonial.quote}"
											</p>
										</blockquote>

										{/* Rating */}
										<div className="flex justify-center gap-1 mb-6">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star
													key={i}
													size={20}
													className="text-yellow-400 fill-yellow-400"
												/>
											))}
										</div>

										{/* Divider */}
										<div className="w-16 h-1 bg-yellow-400 mx-auto mb-6 rounded-full" />

										{/* Client Info */}
										<div className="text-center">
											<h4 className="font-title text-xl font-bold text-slate-900 mb-1">
												{testimonial.name}
											</h4>
											<p className="text-slate-500 font-secondary">
												{testimonial.position}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Buttons */}
					<button
						onClick={prevTestimonial}
						className="absolute top-1/2 -left-2 md:-left-6 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg text-slate-800 hover:bg-yellow-400 hover:text-slate-900 transition-colors flex items-center justify-center border border-slate-100"
						aria-label="Previous testimonial"
					>
						<ChevronLeft size={20} />
					</button>
					<button
						onClick={nextTestimonial}
						className="absolute top-1/2 -right-2 md:-right-6 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg text-slate-800 hover:bg-yellow-400 hover:text-slate-900 transition-colors flex items-center justify-center border border-slate-100"
						aria-label="Next testimonial"
					>
						<ChevronRight size={20} />
					</button>

					{/* Indicators */}
					<div className="flex justify-center mt-8 gap-2">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-yellow-400 w-8"
										: "bg-slate-300 w-2 hover:bg-slate-400"
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
