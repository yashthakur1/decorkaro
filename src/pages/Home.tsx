import React from "react";
import HeroSection from "../components/sections/HeroSection";
import PackagesSection from "../components/sections/PackagesSection";
import WorkSection from "../components/sections/WorkSection";
import VisualiserSection from "../components/sections/VisualiserSection";
import ProcessSection from "../components/sections/ProcessSection";
import EstimatorSection from "../components/sections/EstimatorSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ContactSection from "../components/sections/ContactSection";

const Home: React.FC = () => (
	<>
		<HeroSection />
		<PackagesSection />
		<WorkSection />
		<VisualiserSection />
		<ProcessSection />
		<EstimatorSection />
		<TestimonialsSection />
		<ContactSection />
	</>
);

export default Home;
