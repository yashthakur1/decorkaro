import { timingSafeEqual } from "node:crypto";
import { DEFAULT_SETTINGS, MODEL_CATALOG, isValidSettings, readSettings, writeSettings } from "../_lib/settings.js";

const json = (status: number, body: unknown) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});

function authorized(request: Request): boolean {
	const expected = process.env.ADMIN_PASSWORD;
	const given = request.headers.get("x-admin-password") ?? "";
	if (!expected) return false;
	const a = Buffer.from(given);
	const b = Buffer.from(expected);
	return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request): Promise<Response> {
	if (!authorized(request)) return json(401, { error: "Unauthorized" });
	return json(200, { settings: await readSettings(), catalog: MODEL_CATALOG, defaults: DEFAULT_SETTINGS });
}

export async function PUT(request: Request): Promise<Response> {
	if (!authorized(request)) return json(401, { error: "Unauthorized" });
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json(400, { error: "Invalid JSON" });
	}
	if (!isValidSettings(body)) return json(400, { error: "Unknown provider or model" });
	return json(200, { settings: await writeSettings(body) });
}
