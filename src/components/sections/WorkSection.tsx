import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { PROJECTS, WORK_CATEGORIES } from "../../data/site";

const PAGE_SIZE = 9;

const WorkSection: React.FC = () => {
	const [category, setCategory] = useState<string>("all");
	const [visible, setVisible] = useState(PAGE_SIZE);
	const [open, setOpen] = useState<number | null>(null);

	const items = useMemo(() => {
		if (category !== "all") return PROJECTS.filter((p) => p.category === category);
		// Interleave categories so "All work" shows the range instead of eight bedrooms in a row.
		const groups = WORK_CATEGORIES.filter((c) => c.id !== "all").map((c) =>
			PROJECTS.filter((p) => p.category === c.id),
		);
		const mixed = [];
		for (let i = 0; groups.some((g) => i < g.length); i++) {
			for (const g of groups) if (i < g.length) mixed.push(g[i]);
		}
		return mixed;
	}, [category]);
	const shown = items.slice(0, visible);
	const categoryName = (id: string) => WORK_CATEGORIES.find((c) => c.id === id)?.name ?? "";

	const step = useCallback(
		(dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
		[items.length],
	);

	useEffect(() => {
		if (open === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(null);
			if (e.key === "ArrowRight") step(1);
			if (e.key === "ArrowLeft") step(-1);
		};
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = overflow;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, step]);

	const current = open !== null ? items[open] : null;

	return (
		<section id="work" className="bg-limestone py-20 md:py-28">
			<div className="page">
				<SectionHeading
					title="Recent work"
					intro="Residences, bungalows and commercial spaces across Mumbai and Thane, from single rooms to full fit-outs."
				/>

				<div className="-mx-4 mt-12 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter projects">
					<div className="flex w-max gap-2">
						{WORK_CATEGORIES.map((c) => (
							<button
								key={c.id}
								role="tab"
								aria-selected={category === c.id}
								onClick={() => {
									setCategory(c.id);
									setVisible(PAGE_SIZE);
								}}
								className={category === c.id ? "chip-on" : "chip-off"}
							>
								{c.name}
							</button>
						))}
					</div>
				</div>

				<ul className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[220px] md:grid-cols-3 md:gap-3 lg:auto-rows-[250px]">
					{shown.map((p, i) => (
						<li key={p.image} className={i === 0 ? "col-span-2 row-span-2" : ""}>
							<button
								onClick={() => setOpen(i)}
								className="group relative block h-full w-full overflow-hidden bg-limestone-deep"
								aria-label={`Open ${p.title}, ${p.location}`}
							>
								<img
									src={p.image}
									alt=""
									loading="lazy"
									decoding="async"
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								/>
								<span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-marquina/80 to-transparent p-4 pt-10 text-left text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
									<span className="block text-small font-semibold">{p.title}</span>
									<span className="block text-micro text-white/75">
										{categoryName(p.category)}, {p.location}
									</span>
								</span>
							</button>
						</li>
					))}
				</ul>

				<div className="mt-8 flex items-center justify-between gap-4 text-small text-slate">
					<span>
						Showing {shown.length} of {items.length}
					</span>
					{visible < items.length && (
						<button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-ghost">
							Show more projects
						</button>
					)}
				</div>
			</div>

			{current && (
				<div
					className="fixed inset-0 z-[60] flex flex-col bg-marquina/95 text-white"
					role="dialog"
					aria-modal="true"
					aria-label={current.title}
				>
					<div className="page flex h-16 items-center justify-between">
						<p className="text-small">
							<span className="font-semibold">{current.title}</span>
							<span className="text-white/60">
								{" "}
								{categoryName(current.category)}, {current.location}
							</span>
						</p>
						<button onClick={() => setOpen(null)} className="rounded p-2 hover:bg-white/10" aria-label="Close" autoFocus>
							<X size={22} />
						</button>
					</div>
					<div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
						<img src={current.image} alt={current.title} className="max-h-full max-w-full object-contain" />
						<button
							onClick={() => step(-1)}
							className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-marquina/60 p-3 hover:bg-white/10 sm:left-4"
							aria-label="Previous project"
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={() => step(1)}
							className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-marquina/60 p-3 hover:bg-white/10 sm:right-4"
							aria-label="Next project"
						>
							<ChevronRight size={24} />
						</button>
					</div>
					<p className="pb-5 text-center text-micro text-white/50">
						{(open ?? 0) + 1} / {items.length}
					</p>
				</div>
			)}
		</section>
	);
};

export default WorkSection;
