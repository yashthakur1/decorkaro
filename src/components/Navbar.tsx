import React, { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { useModals } from "./ModalContext";
import { CONTACT } from "../data/site";

const LINKS = [
	{ href: "#packages", label: "Packages" },
	{ href: "#work", label: "Our work" },
	{ href: "#visualiser", label: "AI visualiser" },
	{ href: "#process", label: "How we work" },
	{ href: "#contact", label: "Contact" },
];

const Navbar: React.FC = () => {
	const { openEstimate } = useModals();
	const [solid, setSolid] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setSolid(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const onDark = !solid && !menuOpen;

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
				onDark ? "bg-transparent" : "border-b border-rule bg-white/95 backdrop-blur"
			}`}
		>
			<nav className="page flex h-16 items-center justify-between gap-6 md:h-[72px]" aria-label="Main">
				<a href="#top" aria-label="DecorKaro home">
					<Logo tone={onDark ? "light" : "dark"} />
				</a>

				<ul className="hidden items-center gap-8 lg:flex">
					{LINKS.map((l) => (
						<li key={l.href}>
							<a
								href={l.href}
								className={`text-small font-medium transition-colors ${
									onDark ? "text-white/85 hover:text-white" : "text-slate hover:text-marquina"
								}`}
							>
								{l.label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<a
						href={CONTACT.phoneHref}
						className={`hidden text-small font-medium md:inline-flex md:items-center md:gap-2 md:pr-3 ${
							onDark ? "text-white" : "text-marquina"
						}`}
					>
						<Phone size={16} aria-hidden />
						{CONTACT.phone}
					</a>
					<button onClick={openEstimate} className={`hidden sm:inline-flex ${onDark ? "btn-brass" : "btn-primary"} py-2.5`}>
						Get a free estimate
					</button>
					<button
						onClick={() => setMenuOpen((o) => !o)}
						className={`rounded p-2 lg:hidden ${onDark ? "text-white" : "text-marquina"}`}
						aria-expanded={menuOpen}
						aria-controls="mobile-menu"
						aria-label={menuOpen ? "Close menu" : "Open menu"}
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</nav>

			{menuOpen && (
				<div id="mobile-menu" className="border-t border-rule bg-white lg:hidden">
					<ul className="page flex flex-col py-2">
						{LINKS.map((l) => (
							<li key={l.href}>
								<a
									href={l.href}
									onClick={() => setMenuOpen(false)}
									className="block border-b border-rule py-4 text-body font-medium last:border-0"
								>
									{l.label}
								</a>
							</li>
						))}
					</ul>
					<div className="page flex flex-col gap-3 pb-6 pt-2">
						<button
							onClick={() => {
								setMenuOpen(false);
								openEstimate();
							}}
							className="btn-primary w-full"
						>
							Get a free estimate
						</button>
						<a href={CONTACT.phoneHref} className="btn-ghost w-full">
							<Phone size={16} aria-hidden /> Call {CONTACT.phone}
						</a>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
