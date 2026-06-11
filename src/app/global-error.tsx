"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fbf5f2", color: "#111" }}>
        <main
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1rem",
          }}
        >
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#c8502a", fontWeight: 700 }}>
              Errore critico
            </p>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: "1rem 0" }}>Qualcosa è andato storto</h1>
            <p style={{ color: "#4a4a4a", lineHeight: 1.6, marginBottom: "2rem" }}>
              Ricarica la pagina o torna più tardi.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#c8502a",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                padding: "0.875rem 2rem",
                fontWeight: 700,
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              Riprova
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
