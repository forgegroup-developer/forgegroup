import Link from "next/link";

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-brand-terra/30 bg-brand-nero/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-brand-bianco flex items-center">
            FORGE<span className="text-brand-corallo">GROUP</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/chi-siamo-e-manifesto" className="hover:text-brand-corallo transition-colors">Manifesto</Link>
            <Link href="/servizi" className="hover:text-brand-corallo transition-colors">Servizi</Link>
            <Link href="/casi-studio" className="hover:text-brand-corallo transition-colors">Casi Studio</Link>
            <Link href="/blog" className="text-brand-corallo font-bold">Intelligence</Link>
          </nav>
          <Link href="/contatti" className="bg-brand-corallo text-brand-nero px-6 py-2 rounded-sm font-bold hover:bg-brand-corallo/90 transition-all shadow-[4px_4px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            CANDIDA LA TUA AZIENDA
          </Link>
        </div>
      </header>

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Intelligence <span className="text-brand-corallo">B2B</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Strategie avanzate di Acquisizione Clienti e Vendita High-Ticket. Articoli tecnici riservati a imprenditori e direttori vendite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article Placeholder 1 */}
          <article className="bg-brand-terra/10 border border-brand-terra/30 rounded-lg overflow-hidden group hover:border-brand-corallo transition-all flex flex-col">
            <div className="h-48 bg-black/50 p-6 flex items-end border-b border-brand-terra/30">
              <span className="bg-brand-corallo text-brand-nero text-xs font-bold px-2 py-1 uppercase rounded-sm">Acquisizione</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-brand-bianco mb-3 group-hover:text-brand-corallo transition-colors">
                Perché le Campagne di "Lead Generation" classiche distruggono il tuo Brand B2B
              </h2>
              <p className="text-gray-400 mb-6 text-sm flex-grow">
                Analisi tecnica su come i lead a basso costo stiano saturando i reparti commerciali delle aziende High-Ticket.
              </p>
              <span className="text-brand-corallo font-medium text-sm">Leggi l'articolo &rarr;</span>
            </div>
          </article>

          {/* Article Placeholder 2 */}
          <article className="bg-brand-terra/10 border border-brand-terra/30 rounded-lg overflow-hidden group hover:border-brand-corallo transition-all flex flex-col">
            <div className="h-48 bg-black/50 p-6 flex items-end border-b border-brand-terra/30">
              <span className="bg-brand-corallo text-brand-nero text-xs font-bold px-2 py-1 uppercase rounded-sm">Vendita</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-brand-bianco mb-3 group-hover:text-brand-corallo transition-colors">
                Il Framework definitivo per superare l'obiezione "Costa troppo" in chiamata
              </h2>
              <p className="text-gray-400 mb-6 text-sm flex-grow">
                Non è una questione di prezzo, è una questione di valore percepito. Ecco gli script esatti che usiamo per i nostri clienti in edilizia.
              </p>
              <span className="text-brand-corallo font-medium text-sm">Leggi l'articolo &rarr;</span>
            </div>
          </article>

          {/* Article Placeholder 3 */}
          <article className="bg-brand-terra/10 border border-brand-terra/30 rounded-lg overflow-hidden group hover:border-brand-corallo transition-all flex flex-col">
            <div className="h-48 bg-black/50 p-6 flex items-end border-b border-brand-terra/30">
              <span className="bg-brand-corallo text-brand-nero text-xs font-bold px-2 py-1 uppercase rounded-sm">Sistemi & CRM</span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-brand-bianco mb-3 group-hover:text-brand-corallo transition-colors">
                Mappare il Customer Journey B2B: Da Freddo a Contratto in 45 Giorni
              </h2>
              <p className="text-gray-400 mb-6 text-sm flex-grow">
                Come strutturare l'architettura tecnica e le automazioni di follow-up per accorciare drasticamente il ciclo di vendita B2B.
              </p>
              <span className="text-brand-corallo font-medium text-sm">Leggi l'articolo &rarr;</span>
            </div>
          </article>
        </div>
      </main>

      <footer className="bg-black py-12 border-t border-brand-terra/20 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Forge Group. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
