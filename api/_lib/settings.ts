import { get, put } from "@vercel/blob";

export type ImageProvider = "openai" | "gemini";

export interface PlannerSettings {
	provider: ImageProvider;
	model: string;
	updatedAt?: string;
}

/** Models the admin can choose from. The first entry per provider is its default. */
export const MODEL_CATALOG: Record<ImageProvider, { id: string; label: string }[]> = {
	openai: [
		{ id: "gpt-image-2.5-sunburst-2026-09-08", label: "GPT Image 2.5 Sunburst (latest, best quality)" },
		{ id: "gpt-image-2.5-flare-2026-09-08", label: "GPT Image 2.5 Flare (faster)" },
		{ id: "gpt-image-2", label: "GPT Image 2" },
	],
	gemini: [
		{ id: "gemini-nano-banana-2.1", label: "Nano Banana 2.1 (latest)" },
		{ id: "gemini-3-pro-image", label: "Nano Banana Pro" },
		{ id: "gemini-3.1-flash-image", label: "Nano Banana 2 (fast)" },
	],
};

export const DEFAULT_SETTINGS: PlannerSettings = {
	provider: "openai",
	model: MODEL_CATALOG.openai[0].id,
};

const PATH = "settings/room-planner.json";

export function isValidSettings(value: unknown): value is PlannerSettings {
	if (!value || typeof value !== "object") return false;
	const { provider, model } = value as Record<string, unknown>;
	if (provider !== "openai" && provider !== "gemini") return false;
	return MODEL_CATALOG[provider].some((m) => m.id === model);
}

export async function readSettings(): Promise<PlannerSettings> {
	try {
		const res = await get(PATH, { access: "private", useCache: false });
		if (!res || res.statusCode !== 200) return DEFAULT_SETTINGS;
		const parsed = JSON.parse(await new Response(res.stream).text());
		return isValidSettings(parsed) ? parsed : DEFAULT_SETTINGS;
	} catch {
		return DEFAULT_SETTINGS;
	}
}

export async function writeSettings(settings: PlannerSettings): Promise<PlannerSettings> {
	const saved = { provider: settings.provider, model: settings.model, updatedAt: new Date().toISOString() };
	await put(PATH, JSON.stringify(saved), {
		access: "private",
		contentType: "application/json",
		addRandomSuffix: false,
		allowOverwrite: true,
	});
	return saved;
}
