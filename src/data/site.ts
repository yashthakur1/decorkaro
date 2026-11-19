// Content for the marketing site. Edit copy, prices and contact details here.

export const CONTACT = {
	phone: "+91 99308 45311",
	phoneHref: "tel:+919930845311",
	whatsappHref: "https://wa.me/919321412699?text=" + encodeURIComponent("Hi, I'd like to discuss an interior project."),
	email: "decorkaro.india@gmail.com",
	instagram: "https://www.instagram.com/decorkaro.official/",
	address: ["Sai Baba Mandir, behind Pipeline Road", "Kalher, Thane 421302", "Maharashtra, India"],
	mapsHref: "https://maps.google.com/?q=Decorkaro+Kalher+Thane+421302",
	hours: [
		{ days: "Monday to Friday", time: "10:00 am – 7:00 pm" },
		{ days: "Saturday", time: "10:00 am – 5:00 pm" },
		{ days: "Sunday", time: "By appointment" },
	],
};

export const ESTIMATE_FORM_URL =
	"https://docs.google.com/forms/d/e/1FAIpQLSfFXYQK3TtReir5CIpJ6WP9gTzJ6YjG_dxBdcrn0RZdUAAF5g/viewform?embedded=true";

export const FACTS = [
	{ value: "500+", label: "projects delivered" },
	{ value: "Since 2010", label: "designing in Thane" },
	{ value: "₹3.62L", label: "packages start at" },
	{ value: "Free", label: "3D design before you commit" },
];

export interface Package {
	name: string;
	price: string;
	summary: string;
	includes: string[];
}

export const HOME_PACKAGES: Package[] = [
	{
		name: "1 BHK",
		price: "₹3.62L",
		summary: "Kitchen, wardrobe and living room for compact homes.",
		includes: ["Modular kitchen", "Bedroom wardrobe", "TV unit", "Space-saving storage", "Free 3D design"],
	},
	{
		name: "2 BHK",
		price: "₹4.52L",
		summary: "Every room covered, each one customisable.",
		includes: ["Modular kitchen", "2 bedroom wardrobes", "Living room setup", "TV unit and storage", "Free 3D design"],
	},
	{
		name: "3 BHK",
		price: "₹5.57L",
		summary: "More storage and more room-by-room choice.",
		includes: ["Modular kitchen", "3 bedroom wardrobes", "Living room setup", "Storage across rooms", "Free 3D design"],
	},
	{
		name: "4 BHK",
		price: "₹6.33L",
		summary: "Premium finishes and storage for larger homes.",
		includes: ["Modular kitchen", "4 bedroom wardrobes", "Premium living room", "Storage across rooms", "Free 3D design"],
	},
];

export const OTHER_SERVICES = [
	{
		name: "Modular kitchen",
		price: "From ₹1.7L",
		summary: "Custom layouts, quality materials and efficient storage, with a free design consultation.",
	},
	{
		name: "Commercial and custom",
		price: "Quoted per project",
		summary: "Offices, retail and hospitality, or single rooms. Choose Essentials, Premium or Luxe finishes.",
	},
];

export const PROCESS = [
	{
		title: "Consultation",
		body: "We visit or call, understand how you live or work, and agree a budget range.",
	},
	{
		title: "3D design",
		body: "You get a free 3D design and an itemised estimate. Nothing is built until you approve it.",
	},
	{
		title: "Build",
		body: "Our team manufactures and installs, with one project manager and regular updates on cost and schedule.",
	},
	{
		title: "Handover",
		body: "We hand over on the agreed date and stay available for after-service and maintenance.",
	},
];

export const COMMITMENTS = [
	{ title: "Transparent pricing", body: "Detailed estimates and regular budget updates. No hidden costs." },
	{ title: "On-time delivery", body: "Schedules are agreed up front and tracked through the build." },
	{ title: "Craftsmanship", body: "Superior finishes and attention to detail in every room." },
	{ title: "Support after handover", body: "After-service care and maintenance guidance once you move in." },
];

export const TESTIMONIALS = [
	{
		name: "Aarav Patel",
		role: "Homeowner",
		quote: "DecorKaro transformed our home beyond our expectations. Their attention to detail and commitment to understanding our lifestyle resulted in a space that feels both luxurious and comfortable.",
	},
	{
		name: "Priya Sharma",
		role: "Restaurant owner",
		quote: "Working with DecorKaro on our restaurant was the best decision we made. The ambiance captures our brand, and customers compliment the space constantly.",
	},
	{
		name: "Vikram Malhotra",
		role: "CEO, TechVision India",
		quote: "Our office redesign has noticeably improved morale and productivity. The team balanced aesthetics with function and created a space that inspires the team.",
	},
	{
		name: "Anjali Desai",
		role: "Boutique owner",
		quote: "The team understood exactly what my boutique needed. The design elevated the shopping experience, and sales are up 30% since the renovation.",
	},
];

export const WORK_CATEGORIES = [
	{ id: "all", name: "All work" },
	{ id: "living-room", name: "Living rooms" },
	{ id: "bedroom", name: "Bedrooms" },
	{ id: "kitchen", name: "Kitchens" },
	{ id: "bathroom", name: "Bathrooms" },
	{ id: "bunglow", name: "Bungalows" },
	{ id: "commercial", name: "Commercial" },
	{ id: "concept", name: "Concepts" },
] as const;

export interface Project {
	title: string;
	category: string;
	image: string;
	location: string;
}

export const PROJECTS: Project[] = [
	{ title: "Modern Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/2B079A86-3AA9-4482-A9F5-04D964D9D257.webp", location: "Mumbai" },
	{ title: "Luxurious Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/0E355A02-94F0-4CA2-A6F1-D2B618D7E0D7.webp", location: "Mumbai" },
	{ title: "Contemporary Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/E08999F5-3E2D-4379-88D6-4D3C64808968.webp", location: "Mumbai" },
	{ title: "Elegant Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/60BBEF76-4B9F-4493-8476-23A94AF3614E.webp", location: "Mumbai" },
	{ title: "Designer Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/76E6C216-70F2-4209-9B0B-6E930D444260.webp", location: "Mumbai" },
	{ title: "Premium Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/9D70DE67-F8CF-4C3E-A1AD-2FA78DA5FDBA.webp", location: "Mumbai" },
	{ title: "Stylish Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/E7F12C19-469E-4237-820A-CF7037DD9F9C.webp", location: "Mumbai" },
	{ title: "Cozy Bedroom", category: "bedroom", image: "/images/work/residential/bedroom/F27D35C4-F9A2-47CE-917E-9DC026FEFC0B.webp", location: "Mumbai" },
	{ title: "Modern Living Room", category: "living-room", image: "/images/work/residential/living-room/418EC20F-13C1-4371-A46E-0236DF0EB314.webp", location: "Mumbai" },
	{ title: "Elegant Living Space", category: "living-room", image: "/images/work/residential/living-room/90CCC684-D0DB-462E-80AD-C3440A683DCE.webp", location: "Mumbai" },
	{ title: "Contemporary Living Room", category: "living-room", image: "/images/work/residential/living-room/41970204-3DCE-4BA3-84A7-F6D0B8A5021E.webp", location: "Mumbai" },
	{ title: "Luxury Living Area", category: "living-room", image: "/images/work/residential/living-room/4632C89B-7CED-4964-8F74-97AE6983E12A.webp", location: "Mumbai" },
	{ title: "Designer Living Room", category: "living-room", image: "/images/work/residential/living-room/94DADC0A-797C-4988-B43D-15EEDC5212E0.webp", location: "Mumbai" },
	{ title: "Premium Living Space", category: "living-room", image: "/images/work/residential/living-room/A1A8CBA1-27B6-4608-9ED6-1A713D2C355E.webp", location: "Mumbai" },
	{ title: "Stylish Living Room", category: "living-room", image: "/images/work/residential/living-room/C4DCC989-ED89-4FB3-89DD-FE50206943B9.webp", location: "Mumbai" },
	{ title: "Modern Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/0217A520-F56A-489F-99D7-CA02C59B4844.webp", location: "Mumbai" },
	{ title: "Elegant Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/19941882-D155-4639-9DE9-0A9B8DBE5964.webp", location: "Mumbai" },
	{ title: "Contemporary Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/60290031-9EEC-45BF-90E7-9A4A1CEDD864.webp", location: "Mumbai" },
	{ title: "Luxury Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/401CBC6A-2826-4585-A6AC-A947DC26126E.webp", location: "Mumbai" },
	{ title: "Classic Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/DBA45EF8-3AD0-42B1-BB0A-61F772102C5B.webp", location: "Mumbai" },
	{ title: "Premium Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/89EFAEFB-83B5-46B6-B2EE-D6CF9D2CFD00.webp", location: "Mumbai" },
	{ title: "Stylish Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/AD64E704-4871-4C29-BAB8-1D160E4062AA.webp", location: "Mumbai" },
	{ title: "Cozy Kitchen", category: "kitchen", image: "/images/work/residential/kitchen/7AD71A5F-309F-4202-B8FB-A6DD31A352A7.webp", location: "Mumbai" },
	{ title: "Luxury Bathroom", category: "bathroom", image: "/images/work/residential/bathroom/975FC8B9-3EEB-4CB4-BD5E-2B141EF8AEE3.webp", location: "Mumbai" },
	{ title: "Modern Bathroom", category: "bathroom", image: "/images/work/residential/bathroom/F5042116-45E7-4D08-8AB6-C7B938810B99.webp", location: "Mumbai" },
	{ title: "Elegant Bathroom", category: "bathroom", image: "/images/work/residential/bathroom/5406E364-DE4B-4A58-9586-1DF0A7F64F0A.webp", location: "Mumbai" },
	{ title: "Designer Bathroom", category: "bathroom", image: "/images/work/residential/bathroom/A521695D-7BB9-4553-808F-C14F4C1AC45F.webp", location: "Mumbai" },
	{ title: "Contemporary Bathroom", category: "bathroom", image: "/images/work/residential/bathroom/683827D3-CAB5-48B6-9E39-545CE9F7323A.webp", location: "Mumbai" },
	{ title: "Premium Bathroom", category: "bathroom", image: "/images/work/residential/bathroom/DE463462-43CC-47F0-A72F-156476DB297A.webp", location: "Mumbai" },
	{ title: "Modern Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/004FCDBF-1EFA-4453-8868-E6EE66800538.webp", location: "Mumbai" },
	{ title: "Elegant Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/00BBCD7F-D82F-46FF-87A3-6AE8D8312EC0.webp", location: "Mumbai" },
	{ title: "Designer Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/15CFE1EF-4A8C-406A-BD35-FCECDE46F008.webp", location: "Mumbai" },
	{ title: "Premium Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/2094A7A1-3DD2-42ED-8C10-92E0E9C7E2AE.webp", location: "Mumbai" },
	{ title: "Contemporary Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/27B07F5A-62DD-42C6-93DA-04586216AD50.webp", location: "Mumbai" },
	{ title: "Classic Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/334C3DBF-C8EE-4BEE-BB10-92790084FF1E.webp", location: "Mumbai" },
	{ title: "Spacious Bunglow", category: "bunglow", image: "/images/work/residential/bunglows/B9884EC7-66A3-4DCB-8228-DC37AC13706B.webp", location: "Mumbai" },
	{ title: "Modern Concept", category: "concept", image: "/images/work/residential/concept/3195961F-C729-477D-9DF2-8279C4E9937F.webp", location: "Mumbai" },
	{ title: "Elegant Concept Design", category: "concept", image: "/images/work/residential/concept/AB4D564A-EE2C-4A18-878E-255B9D9E27E1.webp", location: "Mumbai" },
	{ title: "Designer Concept", category: "concept", image: "/images/work/residential/concept/8824646C-6699-4DE0-830B-F11D5BD870BA.webp", location: "Mumbai" },
	{ title: "Stylish Concept", category: "concept", image: "/images/work/residential/concept/43991A36-DAD8-4632-BFC0-036C42ACCD47.webp", location: "Mumbai" },
	{ title: "Modern Office Space", category: "commercial", image: "/images/work/commercial/FC563B17-805E-438D-AF7F-89840078F7FF 2.webp", location: "Mumbai" },
	{ title: "Corporate Interior", category: "commercial", image: "/images/work/commercial/0DF0A7C5-60C7-4A53-94C0-E12F46B2B6CE.webp", location: "Mumbai" },
	{ title: "Executive Office", category: "commercial", image: "/images/work/commercial/2A4AD35B-CBBB-47E3-9A01-4D4D74A23B75.webp", location: "Mumbai" },
	{ title: "Business Workspace", category: "commercial", image: "/images/work/commercial/012BDAC3-1075-4FF4-A114-340D9CCB9721.webp", location: "Mumbai" },
	{ title: "Commercial Design", category: "commercial", image: "/images/work/commercial/1912F8FD-5210-4853-8255-A6B160105E32.webp", location: "Mumbai" },
	{ title: "Professional Space", category: "commercial", image: "/images/work/commercial/8B6370DF-D391-42EA-A22A-17C019CF6138.webp", location: "Mumbai" },
	{ title: "Corporate Lounge", category: "commercial", image: "/images/work/commercial/79C21726-0946-4B74-AB5F-36602D43EFA5.webp", location: "Mumbai" },
	{ title: "Office Reception", category: "commercial", image: "/images/work/commercial/90A5F83D-C247-4FBF-96BB-E6A2F4576689.webp", location: "Mumbai" },
	{ title: "Meeting Room", category: "commercial", image: "/images/work/commercial/97CAE47D-89BB-480B-9AC5-981C2C33BCEB.webp", location: "Mumbai" },
	{ title: "Executive Suite", category: "commercial", image: "/images/work/commercial/AE387D25-F0F4-4AF6-922A-B8A1904107CD.webp", location: "Mumbai" },
	{ title: "Business Center", category: "commercial", image: "/images/work/commercial/C396CB66-18D9-45D7-BE26-19648799C72A.webp", location: "Mumbai" },
	{ title: "Modern Workspace", category: "commercial", image: "/images/work/commercial/C733A0C2-87FB-4D6C-B33E-9765F5951DBC.webp", location: "Mumbai" },
	{ title: "Corporate Office", category: "commercial", image: "/images/work/commercial/CEA2C25C-2409-4A38-B25B-BDB68415723B.webp", location: "Mumbai" },
	{ title: "Premium Office", category: "commercial", image: "/images/work/commercial/E33C1274-79C1-4BEE-82FE-AEB07AE6A123.webp", location: "Mumbai" },
];
