import React, { useEffect, useRef, useState } from "react";
import { Download, ImagePlus, RotateCcw } from "lucide-react";
import Dialog from "./Dialog";

type ImageType = "floor-plan" | "room-photo";

interface Version {
	id: number;
	label: string;
	url: string; // object URL of the generated image
	blob: Blob;
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onBookConsultation: () => void;
}

const STYLES: { name: string; description: string }[] = [
	{
		name: "Modern",
		description:
			"a contemporary modern aesthetic: sleek lines, a neutral palette with strategic accents, clean geometric furniture, glass, polished metal and lacquered finishes, and architectural statement lighting. Polished, refined and elegant",
	},
	{
		name: "Minimalist",
		description:
			"warm minimalism: clean lines, natural wood tones, purposeful restraint, quality furniture, neutral walls and understated decor that lets materials and craftsmanship lead. Calm, airy and quietly sophisticated",
	},
	{
		name: "Scandinavian",
		description:
			"Scandinavian with mid-century influences: light wood, organic curves, soft neutral textiles, wool throws, sheepskin rugs, simple ceramics, plants and pleated lamp shades. Warm, unfussy and serene",
	},
	{
		name: "Industrial",
		description:
			"an industrial loft look: exposed brick, metal piping, concrete, Edison bulbs, metal pendants, leather seating and weathered wood in greys, blacks and warm metallics. Edgy and authentic",
	},
	{
		name: "Rustic",
		description:
			"rustic farmhouse: exposed wooden beams, distressed furniture, warm earth tones, natural linen, wrought iron accents, woven baskets and antique finds. Cozy and lived-in",
	},
	{
		name: "Boho",
		description:
			"bohemian: eclectic patterns, rich earthy tones, rattan, jute and macramé, colourful cushions, vintage rugs, abundant plants and warm lantern lighting. Relaxed and artistic",
	},
];

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

/** Downscale to ≤1600px JPEG so requests stay small and fast. */
async function toApiImage(source: Blob): Promise<{ data: string; mimeType: string }> {
	const bitmap = await createImageBitmap(source);
	const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	const ctx = canvas.getContext("2d")!;
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();
	const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
	return { data: dataUrl.split(",")[1], mimeType: "image/jpeg" };
}

const AIRoomPlannerModal: React.FC<Props> = ({ isOpen, onClose, onBookConsultation }) => {
	const [imageType, setImageType] = useState<ImageType>("floor-plan");
	const [upload, setUpload] = useState<{ file: File; url: string } | null>(null);
	const [versions, setVersions] = useState<Version[]>([]);
	const [activeId, setActiveId] = useState<number | null>(null);
	const [rooms, setRooms] = useState<string[]>([]);
	const [prompt, setPrompt] = useState("");
	const [busy, setBusy] = useState<string | null>(null); // label of the running request
	const [elapsed, setElapsed] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const fileInput = useRef<HTMLInputElement>(null);
	const nextId = useRef(1);
	const urlsRef = useRef<string[]>([]);

	const active = versions.find((v) => v.id === activeId) ?? null;

	useEffect(() => {
		if (!busy) return;
		setElapsed(0);
		const t = window.setInterval(() => setElapsed((s) => s + 1), 1000);
		return () => window.clearInterval(t);
	}, [busy]);

	// Free object URLs on unmount.
	useEffect(() => () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u)), []);

	const reset = () => {
		urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
		urlsRef.current = [];
		setUpload(null);
		setVersions([]);
		setActiveId(null);
		setRooms([]);
		setPrompt("");
		setError(null);
	};

	const chooseFile = (file: File | undefined) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) return setError("Choose an image file (JPG, PNG or WebP).");
		if (file.size > MAX_UPLOAD_BYTES) return setError("That image is over 15 MB. Choose a smaller file.");
		reset();
		const url = URL.createObjectURL(file);
		urlsRef.current.push(url);
		setUpload({ file, url });
	};

	const run = async (mode: "analyze" | "edit", label: string, editPrompt?: string) => {
		const source = mode === "analyze" ? upload?.file : active?.blob;
		if (!source) return;
		setBusy(label);
		setError(null);
		try {
			const image = await toApiImage(source);
			const res = await fetch("/api/room-planner", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ mode, imageType, image, prompt: editPrompt }),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.error || "The design couldn't be generated. Try again.");
			}
			const blob = await res.blob();
			if (mode === "analyze") {
				try {
					setRooms(JSON.parse(decodeURIComponent(res.headers.get("x-planner-rooms") || "%5B%5D")));
				} catch {
					setRooms([]);
				}
			}
			const url = URL.createObjectURL(blob);
			urlsRef.current.push(url);
			const v = { id: nextId.current++, label, url, blob };
			setVersions((vs) => [...vs, v]);
			setActiveId(v.id);
			setPrompt("");
		} catch (e) {
			setError(e instanceof Error ? e.message : "The design couldn't be generated. Try again.");
		} finally {
			setBusy(null);
		}
	};

	const download = async () => {
		if (!active) return;
		const img = await createImageBitmap(active.blob);
		const canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext("2d")!;
		ctx.drawImage(img, 0, 0);
		try {
			const logo = new Image();
			logo.src = "/images/dk-logo.png";
			await logo.decode();
			const w = canvas.width * 0.08;
			const pad = canvas.width * 0.025;
			ctx.globalAlpha = 0.55;
			ctx.drawImage(logo, canvas.width - w - pad, canvas.height - w - pad, w, w);
		} catch {
			/* watermark is best-effort */
		}
		canvas.toBlob((b) => {
			if (!b) return;
			const a = document.createElement("a");
			a.href = URL.createObjectURL(b);
			a.download = `decorkaro-design-${Date.now()}.png`;
			a.click();
			URL.revokeObjectURL(a.href);
		}, "image/png");
	};

	const disabled = Boolean(busy);
	const hasResult = versions.length > 0;

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			size="xl"
			title="AI visualiser"
			description="Upload a floor plan or room photo. Each design takes about a minute."
		>
			<div className="flex h-full flex-col lg:flex-row">
				{/* Controls */}
				<aside className="order-2 border-t border-rule p-5 sm:p-7 lg:order-1 lg:w-[380px] lg:flex-none lg:overflow-y-auto lg:border-r lg:border-t-0">
					{!hasResult ? (
						<div className="space-y-7">
							<fieldset>
								<legend className="mb-3 text-small font-semibold">What are you uploading?</legend>
								<div className="grid grid-cols-2 gap-2">
									{(
										[
											["floor-plan", "Floor plan"],
											["room-photo", "Room photo"],
										] as const
									).map(([value, label]) => (
										<button
											key={value}
											type="button"
											aria-pressed={imageType === value}
											onClick={() => setImageType(value)}
											className={`${imageType === value ? "chip-on" : "chip-off"} justify-center`}
										>
											{label}
										</button>
									))}
								</div>
								<p className="mt-2 text-micro text-slate">
									{imageType === "floor-plan"
										? "A 2D drawing. You'll get a furnished 3D view and a list of rooms to explore."
										: "A photo of an empty or existing room. We keep the walls and windows and restyle the rest."}
								</p>
							</fieldset>

							<div>
								<p className="mb-3 text-small font-semibold">Your image</p>
								<button
									type="button"
									onClick={() => fileInput.current?.click()}
									onDragOver={(e) => e.preventDefault()}
									onDrop={(e) => {
										e.preventDefault();
										chooseFile(e.dataTransfer.files[0]);
									}}
									className="flex w-full flex-col items-center justify-center gap-2 border border-dashed border-marquina/30 bg-limestone/50 px-4 py-8 text-center transition-colors hover:border-marquina"
								>
									<ImagePlus size={22} className="text-slate" aria-hidden />
									<span className="text-small font-semibold">{upload ? upload.file.name : "Choose or drop an image"}</span>
									<span className="text-micro text-slate">JPG, PNG or WebP, up to 15 MB</span>
								</button>
								<input
									ref={fileInput}
									type="file"
									accept="image/png,image/jpeg,image/webp"
									className="sr-only"
									onChange={(e) => chooseFile(e.target.files?.[0])}
								/>
							</div>

							<button onClick={() => run("analyze", "First design")} disabled={!upload || disabled} className="btn-primary w-full">
								{busy ? "Generating…" : "Generate design"}
							</button>
						</div>
					) : (
						<div className="space-y-8">
							{imageType === "floor-plan" && rooms.length > 0 && (
								<div>
									<p className="mb-3 text-small font-semibold">Open a room</p>
									<div className="flex flex-wrap gap-2">
										{rooms.map((room) => (
											<button
												key={room}
												disabled={disabled}
												onClick={() =>
													run(
														"edit",
														room,
														`Show a detailed eye-level view of the ${room} from this layout, photographed with DSLR quality. Keep the furniture, materials and colours consistent with the layout.`,
													)
												}
												className="chip-off disabled:opacity-50"
											>
												{room}
											</button>
										))}
									</div>
								</div>
							)}

							<div>
								<p className="mb-3 text-small font-semibold">Try a style</p>
								<div className="flex flex-wrap gap-2">
									{STYLES.map((s) => (
										<button
											key={s.name}
											disabled={disabled}
											onClick={() =>
												run(
													"edit",
													`${s.name} style`,
													`Restyle this space in ${s.description}. Keep the architecture, windows, lighting direction and proportions exactly as they are; change only finishes, colours, furniture and decor. Photograph with DSLR quality.`,
												)
											}
											className="chip-off disabled:opacity-50"
										>
											{s.name}
										</button>
									))}
								</div>
							</div>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (prompt.trim()) run("edit", prompt.trim().slice(0, 40), prompt.trim());
								}}
							>
								<label htmlFor="planner-prompt" className="mb-3 block text-small font-semibold">
									Describe a change
								</label>
								<textarea
									id="planner-prompt"
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									maxLength={600}
									rows={3}
									placeholder="Make the sofa dark green and add a wooden ceiling"
									className="field resize-none"
								/>
								<button type="submit" disabled={!prompt.trim() || disabled} className="btn-primary mt-3 w-full">
									Apply change
								</button>
							</form>

							<div className="border-t border-rule pt-6">
								<button onClick={onBookConsultation} className="btn-brass w-full">
									Book a consultation for this design
								</button>
								<button onClick={reset} className="mt-3 inline-flex items-center gap-2 text-small text-slate hover:text-marquina">
									<RotateCcw size={14} aria-hidden /> Start over with a new image
								</button>
							</div>
						</div>
					)}

					{error && (
						<p role="alert" className="mt-6 border-l-2 border-red-700 bg-red-50 px-3 py-2.5 text-small text-red-800">
							{error}
						</p>
					)}
				</aside>

				{/* Canvas */}
				<div className="order-1 flex min-h-[46vh] flex-1 flex-col bg-limestone lg:order-2 lg:min-h-0">
					<div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
						{active ? (
							<img
								src={active.url}
								alt={`Generated design: ${active.label}`}
								className="max-h-full max-w-full object-contain shadow-[0_20px_60px_-20px_rgba(27,30,28,0.4)]"
							/>
						) : upload ? (
							<img src={upload.url} alt="Your upload" className="max-h-full max-w-full object-contain" />
						) : (
							<div className="max-w-xs text-center">
								<p className="text-h4 font-semibold">Your design appears here</p>
								<p className="mt-2 text-small text-slate">Choose an image to get started.</p>
							</div>
						)}

						{busy && (
							<div
								className="absolute inset-0 flex flex-col items-center justify-center bg-limestone/85 backdrop-blur-sm"
								aria-live="polite"
							>
								<p className="text-h4 font-semibold">Designing: {busy}</p>
								<div className="mt-5 h-px w-56 overflow-hidden bg-rule">
									<div className="sweep h-px w-1/3 bg-brass" />
								</div>
								<p className="mt-4 text-small tabular-nums text-slate">{elapsed}s elapsed. Usually 30–60 seconds.</p>
							</div>
						)}
					</div>

					{hasResult && (
						<div className="flex items-center gap-3 border-t border-rule bg-white px-4 py-3 sm:px-6">
							<ol className="flex min-w-0 flex-1 gap-2 overflow-x-auto" aria-label="Design versions">
								{versions.map((v) => (
									<li key={v.id} className="flex-none">
										<button
											onClick={() => setActiveId(v.id)}
											aria-current={v.id === activeId}
											title={v.label}
											className={`block h-12 w-16 overflow-hidden border-2 ${
												v.id === activeId ? "border-marquina" : "border-transparent opacity-70 hover:opacity-100"
											}`}
										>
											<img src={v.url} alt={v.label} className="h-full w-full object-cover" />
										</button>
									</li>
								))}
							</ol>
							<button onClick={download} disabled={!active} className="btn-ghost flex-none py-2.5">
								<Download size={16} aria-hidden /> Download
							</button>
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default AIRoomPlannerModal;
