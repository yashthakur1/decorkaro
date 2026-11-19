import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { ModalProvider } from "./ModalContext";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
	<ModalProvider>
		<a
			href="#main"
			className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-white focus:px-4 focus:py-2"
		>
			Skip to content
		</a>
		<Navbar />
		<main id="main">{children}</main>
		<Footer />
		<WhatsAppButton />
	</ModalProvider>
);

export default Layout;
