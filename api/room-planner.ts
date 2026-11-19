import { FrootsError, frootsEditImage } from "./_lib/froots.js";
import { readSettings } from "./_lib/settings.js";

// Image generation takes 30–60s per call.
export const config = { maxDuration: 120 };

const ANALYZE_PROMPTS = {
	"floor-plan":
		"Visualise this floor plan as a real, photographed isometric 3D view of the layout at a 3/4 angle. Keep the walls, room positions and proportions exactly as drawn, and furnish each room tastefully with premium, realistic interiors.",
	"room-photo":
		"Restyle this room with premium, aesthetic interiors photographed with DSLR quality. Maintain the original room architecture, windows, lighting direction and proportions exactly as they are. Transform only the interior materials, finishes, furniture and decor. Keep all structural elements, window positions and natural light sources intact.",
} as const;

const ROOMS_PROMPT =
	'List every room you can identify in this floor plan (e.g. Kitchen, Living Room, Bedroom, Bathroom, Balcony, Dining Area). Reply with exactly one line in the form "Rooms: Kitchen, Living Room, Bedroom" and nothing else.';

const MAX_IMAGE_BASE64 = 4_000_000; // ~3 MB binary; the client downsizes well below this
const MAX_PROMPT = 2000;
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);

// Best-effort per-instance limit so the public endpoint can't be used as a free image API.
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	recent.push(now);
	hits.set(ip, recent);
	return recent.length > LIMIT_PER_WINDOW;
}

function originAllowed(request: Request): boolean {
	const origin = request.headers.get("origin");
	if (!origin) return false;
	try {
		const host = new URL(origin).hostname;
		return (
			host === "decorkaro.in" ||
			host === "www.decorkaro.in" ||
			host === "localhost" ||
			host === "127.0.0.1" ||
			(host.startsWith("decorkaro") && host.endsWith(".vercel.app"))
		);
	} catch {
		return false;
	}
}

const json = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export async function POST(request: Request): Promise<Response> {
	if (!originAllowed(request)) return json(403, { error: "Forbidden" });

	const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
	if (rateLimited(ip)) {
		return json(429, { error: "You've reached the hourly limit for AI designs. Please try again later." });
	}

	let body: {
		mode?: string;
		imageType?: string;
		prompt?: string;
		image?: { data?: string; mimeType?: string };
	};
	try {
		body = await request.json();
	} catch {
		return json(400, { error: "Invalid request" });
	}

	const mode = body.mode === "edit" ? "edit" : "analyze";
	const imageType = body.imageType === "room-photo" ? "room-photo" : "floor-plan";
	const data = body.image?.data ?? "";
	const mimeType = body.image?.mimeType ?? "image/jpeg";
	if (!data || data.length > MAX_IMAGE_BASE64 || !ALLOWED_MIME.has(mimeType)) {
		return json(400, { error: "Please upload a JPG, PNG or WebP image under 3 MB." });
	}

	let prompt: string;
	if (mode === "edit") {
		prompt = (body.prompt ?? "").trim();
		if (!prompt || prompt.length > MAX_PROMPT) return json(400, { error: "Please describe your edit." });
	} else {
		prompt = ANALYZE_PROMPTS[imageType];
	}

	const settings = await readSettings();
	try {
		const result = await frootsEditImage({
			image: { data, mimeType },
			prompt,
			provider: settings.provider,
			model: settings.model,
			describePrompt: mode === "analyze" && imageType === "floor-plan" ? ROOMS_PROMPT : undefined,
		});

		const match = result.text?.match(/Rooms:\s*(.+)/i);
		const rooms = match
			? match[1]
					.split(",")
					.map((r) => r.trim().replace(/[."]+$/, ""))
					.filter(Boolean)
					.slice(0, 20)
			: [];

		return new Response(Buffer.from(result.data, "base64"), {
			status: 200,
			headers: {
				"content-type": result.mimeType,
				"cache-control": "no-store",
				"x-planner-rooms": encodeURIComponent(JSON.stringify(rooms)),
				"x-planner-provider": result.provider,
				"x-planner-model": result.model,
			},
		});
	} catch (err) {
		console.error("[room-planner] generation failed:", err);
		if (err instanceof FrootsError && err.status === 429) {
			return json(429, { error: "Our AI designer is busy right now. Please try again in a minute." });
		}
		return json(502, { error: "We couldn't generate a design this time. Please try again." });
	}
}
