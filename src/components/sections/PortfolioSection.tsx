import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Project {
	id: number;
	title: string;
	category: string;
	image: string;
	location: string;
}

const PortfolioSection: React.FC = () => {
	const [category, setCategory] = useState("bedroom");
	const [selectedImage, setSelectedImage] = useState<Project | null>(null);

	const categories = [
		{ id: "bedroom", name: "Bedroom" },
		{ id: "living-room", name: "Living Room" },
		{ id: "kitchen", name: "Kitchen" },
		{ id: "bathroom", name: "Bathroom" },
		{ id: "bunglow", name: "Bunglow" },
		{ id: "concept", name: "Concept" },
		{ id: "commercial", name: "Commercial" },
	];

	const projects = [
		// Bedroom Projects (8)
		{
			id: 1,
			title: "Modern Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/2B079A86-3AA9-4482-A9F5-04D964D9D257.PNG",
			location: "Mumbai",
		},
		{
			id: 2,
			title: "Luxurious Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/0E355A02-94F0-4CA2-A6F1-D2B618D7E0D7.PNG",
			location: "Mumbai",
		},
		{
			id: 3,
			title: "Contemporary Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/E08999F5-3E2D-4379-88D6-4D3C64808968.PNG",
			location: "Mumbai",
		},
		{
			id: 4,
			title: "Elegant Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/60BBEF76-4B9F-4493-8476-23A94AF3614E.PNG",
			location: "Mumbai",
		},
		{
			id: 5,
			title: "Designer Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/76E6C216-70F2-4209-9B0B-6E930D444260.PNG",
			location: "Mumbai",
		},
		{
			id: 6,
			title: "Premium Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/9D70DE67-F8CF-4C3E-A1AD-2FA78DA5FDBA.PNG",
			location: "Mumbai",
		},
		{
			id: 7,
			title: "Stylish Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/E7F12C19-469E-4237-820A-CF7037DD9F9C.PNG",
			location: "Mumbai",
		},
		{
			id: 8,
			title: "Cozy Bedroom",
			category: "bedroom",
			image: "/images/work/residential/bedroom/F27D35C4-F9A2-47CE-917E-9DC026FEFC0B.PNG",
			location: "Mumbai",
		},
		// Living Room Projects (7)
		{
			id: 9,
			title: "Modern Living Room",
			category: "living-room",
			image:
				"/images/work/residential/living-room/418EC20F-13C1-4371-A46E-0236DF0EB314.PNG",
			location: "Mumbai",
		},
		{
			id: 10,
			title: "Elegant Living Space",
			category: "living-room",
			image:
				"/images/work/residential/living-room/90CCC684-D0DB-462E-80AD-C3440A683DCE.PNG",
			location: "Mumbai",
		},
		{
			id: 11,
			title: "Contemporary Living Room",
			category: "living-room",
			image:
				"/images/work/residential/living-room/41970204-3DCE-4BA3-84A7-F6D0B8A5021E.PNG",
			location: "Mumbai",
		},
		{
			id: 12,
			title: "Luxury Living Area",
			category: "living-room",
			image:
				"/images/work/residential/living-room/4632C89B-7CED-4964-8F74-97AE6983E12A.PNG",
			location: "Mumbai",
		},
		{
			id: 13,
			title: "Designer Living Room",
			category: "living-room",
			image:
				"/images/work/residential/living-room/94DADC0A-797C-4988-B43D-15EEDC5212E0.PNG",
			location: "Mumbai",
		},
		{
			id: 14,
			title: "Premium Living Space",
			category: "living-room",
			image:
				"/images/work/residential/living-room/A1A8CBA1-27B6-4608-9ED6-1A713D2C355E.PNG",
			location: "Mumbai",
		},
		{
			id: 15,
			title: "Stylish Living Room",
			category: "living-room",
			image:
				"/images/work/residential/living-room/C4DCC989-ED89-4FB3-89DD-FE50206943B9.PNG",
			location: "Mumbai",
		},
		// Kitchen Projects (8)
		{
			id: 16,
			title: "Modern Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/0217A520-F56A-489F-99D7-CA02C59B4844.PNG",
			location: "Mumbai",
		},
		{
			id: 17,
			title: "Elegant Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/19941882-D155-4639-9DE9-0A9B8DBE5964.PNG",
			location: "Mumbai",
		},
		{
			id: 18,
			title: "Contemporary Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/60290031-9EEC-45BF-90E7-9A4A1CEDD864.PNG",
			location: "Mumbai",
		},
		{
			id: 19,
			title: "Luxury Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/401CBC6A-2826-4585-A6AC-A947DC26126E.PNG",
			location: "Mumbai",
		},
		{
			id: 20,
			title: "Classic Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/DBA45EF8-3AD0-42B1-BB0A-61F772102C5B.PNG",
			location: "Mumbai",
		},
		{
			id: 21,
			title: "Premium Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/89EFAEFB-83B5-46B6-B2EE-D6CF9D2CFD00.PNG",
			location: "Mumbai",
		},
		{
			id: 22,
			title: "Stylish Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/AD64E704-4871-4C29-BAB8-1D160E4062AA.PNG",
			location: "Mumbai",
		},
		{
			id: 23,
			title: "Cozy Kitchen",
			category: "kitchen",
			image: "/images/work/residential/kitchen/7AD71A5F-309F-4202-B8FB-A6DD31A352A7.PNG",
			location: "Mumbai",
		},
		// Bathroom Projects (6)
		{
			id: 24,
			title: "Luxury Bathroom",
			category: "bathroom",
			image: "/images/work/residential/bathroom/975FC8B9-3EEB-4CB4-BD5E-2B141EF8AEE3.PNG",
			location: "Mumbai",
		},
		{
			id: 25,
			title: "Modern Bathroom",
			category: "bathroom",
			image: "/images/work/residential/bathroom/F5042116-45E7-4D08-8AB6-C7B938810B99.PNG",
			location: "Mumbai",
		},
		{
			id: 26,
			title: "Elegant Bathroom",
			category: "bathroom",
			image: "/images/work/residential/bathroom/5406E364-DE4B-4A58-9586-1DF0A7F64F0A.PNG",
			location: "Mumbai",
		},
		{
			id: 27,
			title: "Designer Bathroom",
			category: "bathroom",
			image: "/images/work/residential/bathroom/A521695D-7BB9-4553-808F-C14F4C1AC45F.PNG",
			location: "Mumbai",
		},
		{
			id: 28,
			title: "Contemporary Bathroom",
			category: "bathroom",
			image: "/images/work/residential/bathroom/683827D3-CAB5-48B6-9E39-545CE9F7323A.PNG",
			location: "Mumbai",
		},
		{
			id: 29,
			title: "Premium Bathroom",
			category: "bathroom",
			image: "/images/work/residential/bathroom/DE463462-43CC-47F0-A72F-156476DB297A.PNG",
			location: "Mumbai",
		},
		// Bunglow Projects (7)
		{
			id: 30,
			title: "Modern Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/004FCDBF-1EFA-4453-8868-E6EE66800538.PNG",
			location: "Mumbai",
		},
		{
			id: 31,
			title: "Elegant Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/00BBCD7F-D82F-46FF-87A3-6AE8D8312EC0.PNG",
			location: "Mumbai",
		},
		{
			id: 32,
			title: "Designer Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/15CFE1EF-4A8C-406A-BD35-FCECDE46F008.PNG",
			location: "Mumbai",
		},
		{
			id: 33,
			title: "Premium Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/2094A7A1-3DD2-42ED-8C10-92E0E9C7E2AE.PNG",
			location: "Mumbai",
		},
		{
			id: 34,
			title: "Contemporary Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/27B07F5A-62DD-42C6-93DA-04586216AD50.PNG",
			location: "Mumbai",
		},
		{
			id: 35,
			title: "Classic Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/334C3DBF-C8EE-4BEE-BB10-92790084FF1E.PNG",
			location: "Mumbai",
		},
		{
			id: 36,
			title: "Spacious Bunglow",
			category: "bunglow",
			image: "/images/work/residential/bunglows/B9884EC7-66A3-4DCB-8228-DC37AC13706B.PNG",
			location: "Mumbai",
		},
		// Concept Projects (4)
		{
			id: 37,
			title: "Modern Concept",
			category: "concept",
			image: "/images/work/residential/concept/3195961F-C729-477D-9DF2-8279C4E9937F.PNG",
			location: "Mumbai",
		},
		{
			id: 38,
			title: "Elegant Concept Design",
			category: "concept",
			image: "/images/work/residential/concept/AB4D564A-EE2C-4A18-878E-255B9D9E27E1.PNG",
			location: "Mumbai",
		},
		{
			id: 39,
			title: "Designer Concept",
			category: "concept",
			image: "/images/work/residential/concept/8824646C-6699-4DE0-830B-F11D5BD870BA.PNG",
			location: "Mumbai",
		},
		{
			id: 40,
			title: "Stylish Concept",
			category: "concept",
			image: "/images/work/residential/concept/43991A36-DAD8-4632-BFC0-036C42ACCD47.PNG",
			location: "Mumbai",
		},
		// Commercial Projects (14)
		{
			id: 41,
			title: "Modern Office Space",
			category: "commercial",
			image: "/images/work/commercial/FC563B17-805E-438D-AF7F-89840078F7FF 2.PNG",
			location: "Mumbai",
		},
		{
			id: 42,
			title: "Corporate Interior",
			category: "commercial",
			image: "/images/work/commercial/0DF0A7C5-60C7-4A53-94C0-E12F46B2B6CE.PNG",
			location: "Mumbai",
		},
		{
			id: 43,
			title: "Executive Office",
			category: "commercial",
			image: "/images/work/commercial/2A4AD35B-CBBB-47E3-9A01-4D4D74A23B75.PNG",
			location: "Mumbai",
		},
		{
			id: 44,
			title: "Business Workspace",
			category: "commercial",
			image: "/images/work/commercial/012BDAC3-1075-4FF4-A114-340D9CCB9721.PNG",
			location: "Mumbai",
		},
		{
			id: 45,
			title: "Commercial Design",
			category: "commercial",
			image: "/images/work/commercial/1912F8FD-5210-4853-8255-A6B160105E32.PNG",
			location: "Mumbai",
		},
		{
			id: 46,
			title: "Professional Space",
			category: "commercial",
			image: "/images/work/commercial/8B6370DF-D391-42EA-A22A-17C019CF6138.PNG",
			location: "Mumbai",
		},
		{
			id: 47,
			title: "Corporate Lounge",
			category: "commercial",
			image: "/images/work/commercial/79C21726-0946-4B74-AB5F-36602D43EFA5.PNG",
			location: "Mumbai",
		},
		{
			id: 48,
			title: "Office Reception",
			category: "commercial",
			image: "/images/work/commercial/90A5F83D-C247-4FBF-96BB-E6A2F4576689.PNG",
			location: "Mumbai",
		},
		{
			id: 49,
			title: "Meeting Room",
			category: "commercial",
			image: "/images/work/commercial/97CAE47D-89BB-480B-9AC5-981C2C33BCEB.PNG",
			location: "Mumbai",
		},
		{
			id: 50,
			title: "Executive Suite",
			category: "commercial",
			image: "/images/work/commercial/AE387D25-F0F4-4AF6-922A-B8A1904107CD.PNG",
			location: "Mumbai",
		},
		{
			id: 51,
			title: "Business Center",
			category: "commercial",
			image: "/images/work/commercial/C396CB66-18D9-45D7-BE26-19648799C72A.PNG",
			location: "Mumbai",
		},
		{
			id: 52,
			title: "Modern Workspace",
			category: "commercial",
			image: "/images/work/commercial/C733A0C2-87FB-4D6C-B33E-9765F5951DBC.PNG",
			location: "Mumbai",
		},
		{
			id: 53,
			title: "Corporate Office",
			category: "commercial",
			image: "/images/work/commercial/CEA2C25C-2409-4A38-B25B-BDB68415723B.PNG",
			location: "Mumbai",
		},
		{
			id: 54,
			title: "Premium Office",
			category: "commercial",
			image: "/images/work/commercial/E33C1274-79C1-4BEE-82FE-AEB07AE6A123.PNG",
			location: "Mumbai",
		},
	];

	const filteredProjects = projects.filter((project) => project.category === category);

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.4 },
		},
		exit: {
			opacity: 0,
			scale: 0.9,
			transition: { duration: 0.2 },
		},
	};

	return (
		<section id="portfolio" className="py-20 bg-slate-50">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<motion.div
					className="text-center max-w-3xl mx-auto mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-yellow-500 font-medium mb-2 font-secondary">OUR PORTFOLIO</p>
					<h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
						Recent Projects
					</h2>
					<p className="text-slate-700 mb-8 font-secondary">
						Explore our portfolio of completed projects across residential and commercial
						spaces.
					</p>
				</motion.div>

				{/* Category Filters */}
				<div className="flex flex-wrap justify-center gap-3 mb-10">
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setCategory(cat.id)}
							className={`px-4 py-2 rounded-full border transition-colors duration-300 font-secondary ${category === cat.id ? "bg-yellow-500 text-slate-900 border-yellow-500" : "bg-white text-slate-700 border-slate-200 hover:bg-yellow-50"}`}
						>
							{cat.name}
						</button>
					))}
				</div>

				{/* Portfolio Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					layout
				>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.id}
								className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer"
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								layout
								transition={{ delay: index * 0.05 }}
								onClick={() => setSelectedImage(project)}
							>
								<div className="aspect-w-4 aspect-h-3">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
									/>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute bottom-0 left-0 right-0 p-6">
										<h3 className="font-title text-xl font-bold text-white mb-2">
											{project.title}
										</h3>
										<p className="text-slate-300 font-secondary">{project.location}</p>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-14"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<p className="text-slate-700 mb-6">
						Want to see more of our work or discuss your project requirements?
					</p>
					<a
						href="#contact"
						className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
					>
						Let's Discuss Your Project
					</a>
				</motion.div>
			</div>

			{/* Image Modal - No Bezels */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedImage(null)}
					>
						{/* Close Button */}
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
							aria-label="Close modal"
						>
							<X className="w-6 h-6 text-white" />
						</button>

						{/* Image */}
						<motion.img
							src={selectedImage.image}
							alt={selectedImage.title}
							className="max-w-[95vw] max-h-[95vh] object-contain"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							onClick={(e) => e.stopPropagation()}
						/>

						{/* Image Title - Bottom Overlay */}
						<motion.div
							className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.1 }}
						>
							<h3 className="font-title text-2xl font-bold text-white text-center">
								{selectedImage.title}
							</h3>
							<p className="text-slate-300 text-center font-secondary mt-1">
								{selectedImage.location}
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default PortfolioSection;
