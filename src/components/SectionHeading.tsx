import React from "react";

const SectionHeading: React.FC<{ title: string; intro: string; tone?: "light" | "dark" }> = ({
	title,
	intro,
	tone = "dark",
}) => (
	<div className="grid gap-5 md:grid-cols-12 md:gap-10">
		<h2 className="display text-h2 md:col-span-6">{title}</h2>
		<p className={`max-w-measure text-body md:col-span-5 md:col-start-8 md:self-end ${tone === "light" ? "text-white/70" : "text-slate"}`}>
			{intro}
		</p>
	</div>
);

export default SectionHeading;
