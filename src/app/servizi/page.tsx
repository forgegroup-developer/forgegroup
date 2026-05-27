import Link from "next/link";

export default function Servizi() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-brand-terra/30 bg-brand-nero/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-brand-bianco flex items-center">
            FORGE<span className="text-brand-corallo">GROUP</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/chi-siamo-e-manifesto" className="hover:text-brand-corallo transition-colors">Manifesto</Link>
            <Link href="/servizi" className="text-brand-corallo font-bold">Servizi</Link>
            <Link href="/casi-studio" className="hover:text-brand-corallo transition-colors">Casi Studio</Link>
            <Link href="/blog" className="hover:text-brand-corallo transition-colors">Intelligence</Link>
          </nav>
          <Link href="/contatti" className="bg-brand-corallo text-brand-nero px-6 py-2 rounded-sm font-bold hover:bg-brand-corallo/90 transition-all shadow-[4px_4px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            CANDIDA LA TUA AZIENDA
          </Link>
        </div>
      </header>

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">L'Ecosistema di <span className="text-brand-corallo">Vendita</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Non offriamo "servizietti" scollegati. Costruiamo infrastrutture complete di acquisizione e conversione progettate per il mercato High-Ticket B2B.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-brand-terra/10 border border-brand-terra/30 p-8 rounded-lg group hover:border-brand-corallo transition-colors">
            <div className="w-16 h-16 bg-brand-nero border border-brand-corallo rounded flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-brand-corallo" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-bianco mb-4">Acquisizione Clienti</h2>
            <p className="text-gray-400 mb-6 line-clamp-4">
              Campagne a Risposta Diretta su misura. Non cerchiamo clic, cerchiamo lead prequalificati pronti a investire nei tuoi servizi High-Ticket.
            </p>
            <span className="text-brand-corallo font-medium group-hover:underline">Scopri di più &rarr;</span>
          </div>

          <div className="bg-brand-terra/10 border border-brand-terra/30 p-8 rounded-lg group hover:border-brand-corallo transition-colors">
            <div className="w-16 h-16 bg-brand-nero border border-brand-corallo rounded flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-brand-corallo" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-bianco mb-4">Vendite & Processi</h2>
            <p className="text-gray-400 mb-6 line-clamp-4">
              Integrazione CRM avanzata, script di vendita telefonica, formazione della forza vendita e gestione automatizzata del follow-up.
            </p>
            <span className="text-brand-corallo font-medium group-hover:underline">Scopri di più &rarr;</span>
          </div>

          <div className="bg-brand-terra/10 border border-brand-terra/30 p-8 rounded-lg group hover:border-brand-corallo transition-colors">
            <div className="w-16 h-16 bg-brand-nero border border-brand-corallo rounded flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-brand-corallo" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-bianco mb-4">Consulenza Strategica</h2>
            <p className="text-gray-400 mb-6 line-clamp-4">
              Riposizionamento dell'offerta, aumento dei prezzi (Pricing Power) e costruzione del modello High-Ticket.
            </p>
            <span className="text-brand-corallo font-medium group-hover:underline">Scopri di più &rarr;</span>
          </div>
        </div>
      </main>

      <footer className="bg-black py-12 border-t border-brand-terra/20 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Forge Group. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
