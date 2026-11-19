import React from "react";
import { Instagram } from "lucide-react";
import Logo from "./Logo";
import { CONTACT, HOME_PACKAGES } from "../data/site";

const Footer: React.FC = () => (
	<footer className="bg-marquina text-white/70">
		<div className="page grid gap-12 py-16 md:grid-cols-12">
			<div className="md:col-span-5">
				<Logo tone="light" />
				<p className="mt-5 max-w-sm text-small">
					Interior design and turnkey fit-outs for homes and workplaces, from our studio in Thane.
				</p>
				<a
					href={CONTACT.instagram}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-6 inline-flex items-center gap-2 text-small text-white hover:text-brass-light"
				>
					<Instagram size={18} aria-hidden /> Instagram
				</a>
			</div>

			<div className="md:col-span-2">
				<h3 className="text-small font-semibold text-white">Studio</h3>
				<ul className="mt-4 space-y-2.5 text-small">
					<li><a className="hover:text-white" href="#work">Our work</a></li>
					<li><a className="hover:text-white" href="#process">How we work</a></li>
					<li><a className="hover:text-white" href="#visualiser">AI visualiser</a></li>
					<li><a className="hover:text-white" href="#contact">Contact</a></li>
				</ul>
			</div>

			<div className="md:col-span-2">
				<h3 className="text-small font-semibold text-white">Packages</h3>
				<ul className="mt-4 space-y-2.5 text-small">
					{HOME_PACKAGES.map((p) => (
						<li key={p.name}><a className="hover:text-white" href="#packages">{p.name} home</a></li>
					))}
					<li><a className="hover:text-white" href="#packages">Modular kitchen</a></li>
				</ul>
			</div>

			<div className="md:col-span-3">
				<h3 className="text-small font-semibold text-white">Visit</h3>
				<address className="mt-4 text-small not-italic leading-relaxed">
					{CONTACT.address.map((line) => (
						<span key={line} className="block">{line}</span>
					))}
				</address>
				<a href={CONTACT.phoneHref} className="mt-4 block text-small text-white hover:text-brass-light">
					{CONTACT.phone}
				</a>
				<a href={`mailto:${CONTACT.email}`} className="mt-1 block break-all text-small text-white hover:text-brass-light">
					{CONTACT.email}
				</a>
			</div>
		</div>
		<div className="border-t border-marquina-line">
			<div className="page flex flex-col gap-2 py-6 text-micro text-white/50 sm:flex-row sm:justify-between">
				<p>© {new Date().getFullYear()} DecorKaro Interior Design. All rights reserved.</p>
				<p>Prices are starting prices and vary with layout and finishes.</p>
			</div>
		</div>
	</footer>
);

export default Footer;
