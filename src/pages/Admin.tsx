import React, { useCallback, useEffect, useState } from "react";
import Logo from "../components/Logo";

type Provider = "openai" | "gemini";
interface Settings {
	provider: Provider;
	model: string;
	updatedAt?: string;
}
type Catalog = Record<Provider, { id: string; label: string }[]>;

const PROVIDER_NAMES: Record<Provider, string> = { openai: "OpenAI GPT Image", gemini: "Google Gemini (Nano Banana)" };
const STORAGE_KEY = "dk-admin-pass";

function readStoredPassword(): string {
	try {
		return sessionStorage.getItem(STORAGE_KEY) ?? "";
	} catch {
		return "";
	}
}

const Admin: React.FC = () => {
	const [password, setPassword] = useState(readStoredPassword);
	const [authed, setAuthed] = useState(false);
	const [catalog, setCatalog] = useState<Catalog | null>(null);
	const [saved, setSaved] = useState<Settings | null>(null);
	const [draft, setDraft] = useState<Settings | null>(null);
	const [status, setStatus] = useState<{ kind: "error" | "ok"; text: string } | null>(null);
	const [loading, setLoading] = useState(false);

	const load = useCallback(async (pass: string) => {
		setLoading(true);
		setStatus(null);
		try {
			const res = await fetch("/api/admin/settings", { headers: { "x-admin-password": pass } });
			if (res.status === 401) throw new Error("That password isn't right.");
			if (!res.ok) throw new Error(`Couldn't load settings (${res.status}).`);
			const body = await res.json();
			setCatalog(body.catalog);
			setSaved(body.settings);
			setDraft(body.settings);
			setAuthed(true);
			try {
				sessionStorage.setItem(STORAGE_KEY, pass);
			} catch {
				/* private mode */
			}
		} catch (e) {
			setAuthed(false);
			setStatus({ kind: "error", text: e instanceof Error ? e.message : "Couldn't load settings." });
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const stored = readStoredPassword();
		if (stored) load(stored);
	}, [load]);

	const save = async () => {
		if (!draft) return;
		setLoading(true);
		setStatus(null);
		try {
			const res = await fetch("/api/admin/settings", {
				method: "PUT",
				headers: { "content-type": "application/json", "x-admin-password": password },
				body: JSON.stringify({ provider: draft.provider, model: draft.model }),
			});
			const body = await res.json();
			if (!res.ok) throw new Error(body.error || `Save failed (${res.status}).`);
			setSaved(body.settings);
			setDraft(body.settings);
			setStatus({ kind: "ok", text: "Saved. New designs use this model straight away." });
		} catch (e) {
			setStatus({ kind: "error", text: e instanceof Error ? e.message : "Save failed." });
		} finally {
			setLoading(false);
		}
	};

	const dirty = draft && saved && (draft.provider !== saved.provider || draft.model !== saved.model);

	return (
		<div className="min-h-screen bg-limestone">
			<header className="border-b border-rule bg-white">
				<div className="page flex h-16 items-center justify-between">
					<a href="/" aria-label="Back to site">
						<Logo />
					</a>
					<span className="text-small text-slate">Admin</span>
				</div>
			</header>

			<main className="page max-w-2xl py-14">
				<h1 className="display text-h2">Settings</h1>

				{!authed ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							load(password);
						}}
						className="mt-10 border border-rule bg-white p-6 sm:p-8"
					>
						<label htmlFor="admin-pass" className="field-label">Admin password</label>
						<input
							id="admin-pass"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="field"
						/>
						<button type="submit" disabled={!password || loading} className="btn-primary mt-5">
							{loading ? "Checking…" : "Sign in"}
						</button>
					</form>
				) : (
					draft &&
					catalog && (
						<section className="mt-10 border border-rule bg-white p-6 sm:p-8">
							<h2 className="text-h4 font-semibold">AI visualiser model</h2>
							<p className="mt-1 text-small text-slate">
								Chooses which image model renders floor plans and room photos. If the chosen provider fails, the
								other one is tried automatically.
							</p>

							<fieldset className="mt-8">
								<legend className="field-label">Provider</legend>
								<div className="grid gap-2 sm:grid-cols-2">
									{(Object.keys(catalog) as Provider[]).map((p) => (
										<button
											key={p}
											type="button"
											aria-pressed={draft.provider === p}
											onClick={() => setDraft({ provider: p, model: catalog[p][0].id })}
											className={`${draft.provider === p ? "chip-on" : "chip-off"} justify-start py-3`}
										>
											{PROVIDER_NAMES[p]}
										</button>
									))}
								</div>
							</fieldset>

							<div className="mt-6">
								<label htmlFor="model" className="field-label">Model</label>
								<select
									id="model"
									value={draft.model}
									onChange={(e) => setDraft({ ...draft, model: e.target.value })}
									className="field"
								>
									{catalog[draft.provider].map((m) => (
										<option key={m.id} value={m.id}>
											{m.label}
										</option>
									))}
								</select>
								<p className="mt-2 text-micro text-slate">Model ID: {draft.model}</p>
							</div>

							<div className="mt-8 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
								<button onClick={save} disabled={!dirty || loading} className="btn-primary">
									{loading ? "Saving…" : "Save changes"}
								</button>
								{saved?.updatedAt && (
									<span className="text-micro text-slate">
										Last saved {new Date(saved.updatedAt).toLocaleString("en-IN")}
									</span>
								)}
							</div>
						</section>
					)
				)}

				{status && (
					<p
						role={status.kind === "error" ? "alert" : "status"}
						className={`mt-6 border-l-2 px-3 py-2.5 text-small ${
							status.kind === "error" ? "border-red-700 bg-red-50 text-red-800" : "border-brass bg-white text-marquina"
						}`}
					>
						{status.text}
					</p>
				)}
			</main>
		</div>
	);
};

export default Admin;
