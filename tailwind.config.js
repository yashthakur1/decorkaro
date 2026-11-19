/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Archivo"', "ui-sans-serif", "system-ui", "sans-serif"],
			},
			colors: {
				// Taken from the studio's own work: Nero Marquina stone, limestone, brushed brass, walnut.
				marquina: { DEFAULT: "#1B1E1C", soft: "#262A27", line: "#3A3F3B" },
				limestone: { DEFAULT: "#EEEDE9", deep: "#E2E0DA" },
				brass: { DEFAULT: "#A07A3F", light: "#C6A56C", dark: "#7D5E2E" },
				walnut: "#5A4434",
				slate: { DEFAULT: "#6A6F6B", light: "#9A9E9A" },
				rule: "#D9D7D1",
			},
			fontSize: {
				// Modular scale (1.25) anchored at 17px body.
				body: ["1.0625rem", { lineHeight: "1.65" }],
				small: ["0.9375rem", { lineHeight: "1.55" }],
				micro: ["0.8125rem", { lineHeight: "1.4" }],
				h4: ["1.25rem", { lineHeight: "1.35" }],
				h3: ["1.5625rem", { lineHeight: "1.25" }],
				h2: ["clamp(2rem, 3.2vw + 1rem, 3.05rem)", { lineHeight: "1.08" }],
				h1: ["clamp(2.4rem, 3.6vw + 1rem, 4.4rem)", { lineHeight: "1.02" }],
			},
			letterSpacing: {
				display: "-0.025em",
			},
			maxWidth: {
				measure: "62ch",
				page: "84rem",
			},
			borderRadius: {
				sm: "2px",
				DEFAULT: "4px",
			},
		},
	},
	plugins: [],
};
