/**
 * Le operazioni sulle PR della redazione fatte da Vercel con l'API di GitHub.
 * Stessa logica di `scripts/github.mjs` (che usa `gh api` sul Mac e nelle routine cloud),
 * qui con fetch e il token GITHUB_REDAZIONE_TOKEN: fine-grained, solo questo repo,
 * Contents e Pull requests in scrittura. Non sta mai nel repo.
 */
export const REPO = "forgegroup-developer/forgegroup";
const API = "https://api.github.com";

export type Pr = {
  number: number;
  title: string;
  url: string;
  body: string;
  isDraft: boolean;
  state: "OPEN" | "CLOSED" | "MERGED";
  headRefName: string;
  headSha: string;
  mergeSha: string | null;
  nodeId: string;
  createdAt: string;
  labels: string[];
};

function token() {
  const t = process.env.GITHUB_REDAZIONE_TOKEN?.trim();
  if (!t) throw new Error("manca GITHUB_REDAZIONE_TOKEN su Vercel");
  return t;
}

async function api<T = unknown>(percorso: string, { metodo = "GET", campi }: { metodo?: string; campi?: unknown } = {}): Promise<T> {
  const r = await fetch(`${API}/${percorso}`, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(campi ? { "Content-Type": "application/json" } : {}),
    },
    body: campi ? JSON.stringify(campi) : undefined,
    cache: "no-store",
  });
  if (!r.ok) {
    const j = (await r.json().catch(() => ({}))) as { message?: string };
    throw new Error(`GitHub ${metodo} ${percorso.split("?")[0]}: ${r.status} ${j.message ?? ""}`.trim());
  }
  return (r.status === 204 ? null : await r.json()) as T;
}

type PrGitHub = {
  number: number;
  title: string;
  html_url: string;
  body: string | null;
  draft: boolean;
  state: string;
  merged_at: string | null;
  merge_commit_sha: string | null;
  node_id: string;
  created_at: string;
  head: { ref: string; sha: string };
  labels: { name: string }[];
};

function comePr(p: PrGitHub): Pr {
  return {
    number: p.number,
    title: p.title,
    url: p.html_url,
    body: p.body ?? "",
    isDraft: p.draft,
    state: p.merged_at ? "MERGED" : p.state === "open" ? "OPEN" : "CLOSED",
    headRefName: p.head.ref,
    headSha: p.head.sha,
    mergeSha: p.merged_at ? p.merge_commit_sha : null,
    nodeId: p.node_id,
    createdAt: p.created_at,
    labels: p.labels.map((l) => l.name),
  };
}

export async function prVedi(n: number | string): Promise<Pr> {
  return comePr(await api<PrGitHub>(`repos/${REPO}/pulls/${Number(n)}`));
}

export async function prFile(n: number | string): Promise<string[]> {
  const file: string[] = [];
  for (let pagina = 1; ; pagina++) {
    const blocco = await api<{ filename: string }[]>(`repos/${REPO}/pulls/${Number(n)}/files?per_page=100&page=${pagina}`);
    file.push(...blocco.map((f) => f.filename));
    if (blocco.length < 100) return file;
  }
}

/** Le PR aperte con un'etichetta; `bozze`: true solo bozze, false solo pronte, undefined tutte. */
export async function prElenco({ etichetta, bozze }: { etichetta?: string; bozze?: boolean } = {}): Promise<Pr[]> {
  const aperte: PrGitHub[] = [];
  for (let pagina = 1; ; pagina++) {
    const blocco = await api<PrGitHub[]>(`repos/${REPO}/pulls?state=open&per_page=100&page=${pagina}`);
    aperte.push(...blocco);
    if (blocco.length < 100) break;
  }
  return aperte
    .map(comePr)
    .filter((p) => !etichetta || p.labels.includes(etichetta))
    .filter((p) => bozze === undefined || p.isDraft === bozze);
}

/** Il contenuto di un file a un ramo o commit, come byte. */
export async function leggiFile(rif: string, percorso: string): Promise<Buffer> {
  const indirizzo = `repos/${REPO}/contents/${percorso.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(rif)}`;
  const j = await api<{ content: string; encoding: string }>(indirizzo);
  if (j.encoding === "base64" && j.content) return Buffer.from(j.content, "base64");
  // File sopra 1 MB: il contenuto non arriva inline, si scarica grezzo.
  const r = await fetch(`${API}/${indirizzo}`, {
    headers: { Authorization: `Bearer ${token()}`, Accept: "application/vnd.github.raw" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`GitHub file ${percorso}: ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

export async function prCommenta(n: number | string, testo: string) {
  await api(`repos/${REPO}/issues/${Number(n)}/comments`, { metodo: "POST", campi: { body: testo } });
}

export async function cancellaRamo(ramo: string) {
  try {
    await api(`repos/${REPO}/git/refs/heads/${ramo}`, { metodo: "DELETE" });
  } catch {
    // il ramo può essere già stato cancellato
  }
}

export async function prChiudi(n: number | string, { cancella = true } = {}) {
  const p = await api<PrGitHub>(`repos/${REPO}/pulls/${Number(n)}`, { metodo: "PATCH", campi: { state: "closed" } });
  if (cancella) await cancellaRamo(p.head.ref);
}

export async function prUnisci(n: number | string, { cancella = true } = {}) {
  const p = await prVedi(n);
  await api(`repos/${REPO}/pulls/${Number(n)}/merge`, { metodo: "PUT", campi: { merge_method: "squash" } });
  if (cancella) await cancellaRamo(p.headRefName);
}

/** Bozza → pronta per la revisione (esiste solo in GraphQL). */
export async function prPronta(n: number | string) {
  const p = await prVedi(n);
  if (!p.isDraft) return;
  const r = await api<{ errors?: { message: string }[] }>("graphql", {
    metodo: "POST",
    campi: {
      query: "mutation($id: ID!) { markPullRequestReadyForReview(input: { pullRequestId: $id }) { clientMutationId } }",
      variables: { id: p.nodeId },
    },
  });
  if (r.errors?.length) throw new Error(`GitHub: ${r.errors[0].message}`);
}

export async function prCrea({ ramo, titolo, corpo }: { ramo: string; titolo: string; corpo: string }) {
  const p = await api<PrGitHub>(`repos/${REPO}/pulls`, { metodo: "POST", campi: { base: "main", head: ramo, title: titolo, body: corpo } });
  return { number: p.number, url: p.html_url };
}

/**
 * Un commit su un ramo con file nuovi, cambiati o tolti (contenuto `null`), senza copia di lavoro.
 * Se `crea` è vero il ramo nasce dal commit `base`; altrimenti si aggiunge in cima al ramo.
 */
export async function scriviCommit({
  ramo,
  messaggio,
  file,
  base,
  crea = false,
}: {
  ramo: string;
  messaggio: string;
  file: { percorso: string; contenuto: Buffer | null }[];
  base?: string;
  crea?: boolean;
}) {
  const genitore = crea ? base! : (await api<{ object: { sha: string } }>(`repos/${REPO}/git/ref/heads/${ramo}`)).object.sha;
  const commitGenitore = await api<{ tree: { sha: string } }>(`repos/${REPO}/git/commits/${genitore}`);
  const albero = [];
  for (const f of file) {
    if (f.contenuto === null) {
      albero.push({ path: f.percorso, mode: "100644", type: "blob", sha: null });
    } else {
      const blob = await api<{ sha: string }>(`repos/${REPO}/git/blobs`, {
        metodo: "POST",
        campi: { content: f.contenuto.toString("base64"), encoding: "base64" },
      });
      albero.push({ path: f.percorso, mode: "100644", type: "blob", sha: blob.sha });
    }
  }
  const nuovoAlbero = await api<{ sha: string }>(`repos/${REPO}/git/trees`, {
    metodo: "POST",
    campi: { base_tree: commitGenitore.tree.sha, tree: albero },
  });
  const commit = await api<{ sha: string }>(`repos/${REPO}/git/commits`, {
    metodo: "POST",
    campi: { message: messaggio, tree: nuovoAlbero.sha, parents: [genitore] },
  });
  if (crea) {
    await api(`repos/${REPO}/git/refs`, { metodo: "POST", campi: { ref: `refs/heads/${ramo}`, sha: commit.sha } });
  } else {
    await api(`repos/${REPO}/git/refs/heads/${ramo}`, { metodo: "PATCH", campi: { sha: commit.sha } });
  }
  return commit.sha;
}

export async function shaDiMain() {
  return (await api<{ object: { sha: string } }>(`repos/${REPO}/git/ref/heads/main`)).object.sha;
}
