import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleFormModal from "./GoogleFormModal";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 pt-4">
			<div className="container mx-auto flex items-center justify-between gap-4">
				{/* Logo - Separate Circle */}
				<Link
					to="/"
					className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-slate-900 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex-shrink-0"
				>
					<img
						src="/images/dk-logo.png"
						alt="DecorKaro"
						className="h-8 md:h-10 w-auto brightness-0 invert"
					/>
				</Link>

				{/* Main Navigation Pill */}
				<div
					className={`hidden md:flex items-center bg-slate-900 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 ${
						scrolled ? "py-2 px-4" : "py-3 px-6"
					}`}
				>
					<div className="flex items-center space-x-8">
						<a
							href="#about"
							className="text-white hover:text-yellow-400 transition-colors font-title"
						>
							About
						</a>
						<a
							href="#services"
							className="text-white hover:text-yellow-400 transition-colors font-title"
						>
							Services
						</a>
						<a
							href="#packages"
							className="text-white hover:text-yellow-400 transition-colors font-title"
						>
							Packages
						</a>
						<a
							href="#testimonials"
							className="text-white hover:text-yellow-400 transition-colors font-title"
						>
							Testimonials
						</a>
						<button
							onClick={() => setIsFormModalOpen(true)}
							className="px-5 py-2 rounded-full font-title bg-yellow-500 text-slate-900 hover:bg-yellow-400 transition-colors font-semibold"
						>
							Get Free Estimate
						</button>
					</div>
				</div>

				{/* Mobile Navigation Toggle */}
				<div className="flex md:hidden items-center gap-2">
					<a
						href="tel:+919930845311"
						className="p-3 rounded-full bg-slate-900 text-yellow-500 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
					>
						<Phone size={20} />
					</a>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="p-3 rounded-full bg-slate-900 text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.2 }}
					className="md:hidden mt-4 mx-4 bg-slate-900 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] overflow-hidden"
				>
					<div className="flex flex-col space-y-1 p-4">
						<a
							href="#about"
							className="py-3 px-4 text-white hover:bg-white/10 rounded-xl transition-colors"
							onClick={() => setIsOpen(false)}
						>
							About
						</a>
						<a
							href="#services"
							className="py-3 px-4 text-white hover:bg-white/10 rounded-xl transition-colors"
							onClick={() => setIsOpen(false)}
						>
							Services
						</a>
						<a
							href="#portfolio"
							className="py-3 px-4 text-white hover:bg-white/10 rounded-xl transition-colors"
							onClick={() => setIsOpen(false)}
						>
							Portfolio
						</a>
						<a
							href="#testimonials"
							className="py-3 px-4 text-white hover:bg-white/10 rounded-xl transition-colors"
							onClick={() => setIsOpen(false)}
						>
							Testimonials
						</a>
						<button
							className="py-3 px-4 bg-yellow-500 text-slate-900 hover:bg-yellow-400 rounded-xl text-center w-full font-semibold mt-2 transition-colors"
							onClick={() => {
								setIsOpen(false);
								setIsFormModalOpen(true);
							}}
						>
							Get Free Estimate
						</button>
					</div>
				</motion.div>
			)}

			{/* Google Form Modal */}
			<GoogleFormModal
				isOpen={isFormModalOpen}
				onClose={() => setIsFormModalOpen(false)}
			/>
		</nav>
	);
};

export default Navbar;
