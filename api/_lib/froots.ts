/** Minimal server-side client for froots' bit-graphics MCP (stateless streamable HTTP).
 *  froots holds the OpenAI/Gemini keys; this app only ever holds FROOTS_TOKEN. */

import type { ImageProvider } from "./settings.js";

const DEFAULT_FROOTS_URL = "https://froots.bitroot.club";

type ContentBlock = { type: "text"; text: string } | { type: "image"; data: string; mimeType: string };

interface ToolResult {
	content?: ContentBlock[];
	isError?: boolean;
}

export class FrootsError extends Error {
	constructor(
		message: string,
		public status = 502,
		public retryWithProvider: ImageProvider | null = null,
	) {
		super(message);
	}
}

async function callTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
	const token = process.env.FROOTS_TOKEN;
	if (!token) throw new FrootsError("Image service is not configured", 503);
	const base = (process.env.FROOTS_URL || DEFAULT_FROOTS_URL).replace(/\/+$/, "");

	const res = await fetch(`${base}/mcp/bit-graphics`, {
		method: "POST",
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
			accept: "application/json, text/event-stream",
		},
		body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
	});
	const body = await res.text();
	if (!res.ok) throw new FrootsError(`froots ${res.status}: ${body.slice(0, 200)}`);

	let message: { result?: ToolResult; error?: { message?: string } } | null = null;
	if ((res.headers.get("content-type") ?? "").includes("text/event-stream")) {
		for (const line of body.split(/\r?\n/)) {
			if (!line.startsWith("data:")) continue;
			try {
				const msg = JSON.parse(line.slice(5).trim());
				if (msg.result || msg.error) message = msg;
			} catch {
				/* partial event */
			}
		}
	} else {
		message = JSON.parse(body);
	}
	if (!message) throw new FrootsError("froots returned no result");
	if (message.error) throw new FrootsError(`froots: ${message.error.message ?? "unknown error"}`);
	return message.result ?? {};
}

export interface EditResult {
	data: string;
	mimeType: string;
	text: string | null;
	provider: ImageProvider;
	model: string;
}

async function editOnce(args: {
	image: { data: string; mimeType: string };
	prompt: string;
	provider: ImageProvider;
	model?: string;
	describePrompt?: string;
}): Promise<EditResult> {
	const result = await callTool("edit_image", {
		images: [{ data: args.image.data, mime_type: args.image.mimeType }],
		prompt: args.prompt,
		provider: args.provider,
		...(args.model ? { model: args.model } : {}),
		image_size: "2K",
		...(args.describePrompt ? { describe_prompt: args.describePrompt } : {}),
	});
	const blocks = result.content ?? [];
	const textBlock = blocks.find((b): b is Extract<ContentBlock, { type: "text" }> => b.type === "text");
	let meta: Record<string, unknown> = {};
	try {
		meta = JSON.parse(textBlock?.text ?? "{}");
	} catch {
		/* not JSON */
	}

	if (result.isError) {
		const retry = meta.retryWithProvider;
		const status = Number(meta.status);
		throw new FrootsError(
			String(meta.error ?? textBlock?.text ?? "Image generation failed"),
			status === 429 ? 429 : 502,
			retry === "openai" || retry === "gemini" ? retry : null,
		);
	}

	const image = blocks.find((b): b is Extract<ContentBlock, { type: "image" }> => b.type === "image");
	if (!image) throw new FrootsError("No image was returned");
	return {
		data: image.data,
		mimeType: image.mimeType || "image/png",
		text: typeof meta.text === "string" ? meta.text : null,
		provider: meta.provider === "gemini" ? "gemini" : "openai",
		model: typeof meta.model === "string" ? meta.model : "",
	};
}

/** Edit with the configured provider; on failure follow froots' suggested fallback once,
 *  using that provider's server default model. */
export async function frootsEditImage(args: Parameters<typeof editOnce>[0]): Promise<EditResult> {
	try {
		return await editOnce(args);
	} catch (err) {
		if (err instanceof FrootsError && err.retryWithProvider && err.retryWithProvider !== args.provider) {
			console.warn(`[room-planner] ${args.provider} failed (${err.message}); retrying with ${err.retryWithProvider}`);
			return editOnce({ ...args, provider: err.retryWithProvider, model: undefined });
		}
		throw err;
	}
}
