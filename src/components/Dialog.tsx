import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	size?: "md" | "xl";
	children: React.ReactNode;
}

/** Accessible modal shell: focus moves in, Escape closes, page scroll locks. */
const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, description, size = "md", children }) => {
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const previous = document.activeElement as HTMLElement | null;
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		panelRef.current?.focus();
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = overflow;
			window.removeEventListener("keydown", onKey);
			previous?.focus();
		};
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[60] flex items-end justify-center bg-marquina/70 sm:items-center sm:p-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
					onMouseDown={(e) => e.target === e.currentTarget && onClose()}
				>
					<motion.div
						ref={panelRef}
						role="dialog"
						aria-modal="true"
						aria-label={title}
						tabIndex={-1}
						initial={{ y: 24, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 24, opacity: 0 }}
						transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
						className={`flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t bg-white shadow-[0_30px_80px_-20px_rgba(27,30,28,0.45)] focus:outline-none sm:rounded ${
							size === "xl" ? "sm:h-[90vh] sm:max-w-7xl" : "sm:max-w-2xl"
						}`}
					>
						<header className="flex items-start justify-between gap-6 border-b border-rule px-5 py-4 sm:px-7 sm:py-5">
							<div>
								<h2 className="text-h4 font-semibold">{title}</h2>
								{description && <p className="mt-1 text-small text-slate">{description}</p>}
							</div>
							<button
								onClick={onClose}
								className="-mr-2 rounded p-2 text-slate transition-colors hover:bg-limestone hover:text-marquina"
								aria-label="Close"
							>
								<X size={20} />
							</button>
						</header>
						<div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Dialog;
