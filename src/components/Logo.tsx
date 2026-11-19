import React from "react";

interface LogoProps {
	tone?: "light" | "dark";
	className?: string;
}

/** DK monogram + wordmark. The source PNG is white; dark tone renders it black. */
const Logo: React.FC<LogoProps> = ({ tone = "dark", className = "" }) => (
	<span className={`inline-flex items-center gap-3 ${className}`}>
		<img
			src="/images/dk-logo.png"
			alt=""
			width={32}
			height={32}
			className={`h-8 w-8 ${tone === "dark" ? "brightness-0" : ""}`}
		/>
		<span
			className={`display-condensed text-[1.05rem] leading-none ${tone === "dark" ? "text-marquina" : "text-white"}`}
			style={{ fontVariationSettings: '"wdth" 110', letterSpacing: "0.06em", fontWeight: 600 }}
		>
			DECORKARO
		</span>
	</span>
);

export default Logo;
