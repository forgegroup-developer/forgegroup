import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Nav Placeholder */}
      <header className="border-b border-brand-terra/30 bg-brand-nero/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-brand-bianco flex items-center">
            FORGE<span className="text-brand-corallo">GROUP</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/chi-siamo-e-manifesto" className="hover:text-brand-corallo transition-colors">Manifesto</Link>
            <Link href="/servizi" className="hover:text-brand-corallo transition-colors">Servizi</Link>
            <Link href="/casi-studio" className="hover:text-brand-corallo transition-colors">Casi Studio</Link>
            <Link href="/blog" className="hover:text-brand-corallo transition-colors">Intelligence</Link>
          </nav>
          <Link href="/contatti" className="bg-brand-corallo text-brand-nero px-6 py-2 rounded-sm font-bold hover:bg-brand-corallo/90 transition-all shadow-[4px_4px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            CANDIDA LA TUA AZIENDA
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-nero via-brand-nero to-brand-terra/20 -z-10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
              Smettila Di Accontentarti Di <span className="text-brand-corallo">Lead Spazzatura</span> E Margini Ridicoli.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Uniamo la forza spietata del <strong>Marketing a Risposta Diretta</strong> all'ingegneria di un <strong>Reparto Vendite High-Ticket</strong>. Portiamo solo clienti altospendenti alla tua azienda B2B.
            </p>
            
            {/* VSL Placeholder */}
            <div className="aspect-video w-full max-w-4xl mx-auto bg-black/50 border border-brand-terra/50 rounded-lg shadow-2xl flex items-center justify-center relative group cursor-pointer mb-12">
              <div className="absolute inset-0 bg-brand-corallo/5 group-hover:bg-brand-corallo/10 transition-colors"></div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-brand-corallo rounded-full flex items-center justify-center mb-4 shadow-lg shadow-brand-corallo/20">
                  <svg className="w-8 h-8 text-brand-nero ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <span className="font-medium text-brand-pesca">Guarda come trasformiamo il tuo processo di vendita (4 min)</span>
              </div>
            </div>

            <Link href="/contatti" className="inline-block bg-brand-corallo text-brand-nero px-8 py-4 text-lg rounded-sm font-bold hover:bg-brand-corallo/90 transition-all shadow-[6px_6px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
              VOGLIO SCALARE ORA
            </Link>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-24 bg-brand-nero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  La Verità Scomoda Sulle Agenzie "Tradizionali"
                </h2>
                <div className="w-20 h-2 bg-brand-corallo mb-8"></div>
                <p className="text-lg text-gray-300 mb-6">
                  Ti hanno venduto "visibilità", "like" e "clic". Hanno riempito il tuo CRM di contatti freddi, non qualificati, che ti fanno solo perdere tempo.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  Risultato? Il tuo reparto commerciale è frustrato, i margini si assottigliano e tu lavori il doppio per guadagnare lo stesso.
                </p>
                <p className="text-lg font-bold text-brand-pesca">
                  In Forge Group non facciamo "creatività". Costruiamo Ecosistemi di Acquisizione progettati per estrarre profitto dal mercato.
                </p>
              </div>
              <div className="bg-brand-terra/10 border border-brand-terra/30 p-8 rounded-lg relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black">?</div>
                <ul className="space-y-6 relative z-10">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mt-1 mr-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    <span className="text-xl font-medium text-gray-200">Preventivi fatti a vuoto</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mt-1 mr-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    <span className="text-xl font-medium text-gray-200">Clienti che chiedono sconti</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mt-1 mr-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    <span className="text-xl font-medium text-gray-200">Mancanza di prevedibilità mensile</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-black py-12 border-t border-brand-terra/20 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Forge Group. Tutti i diritti riservati. P.IVA / Dati Aziendali</p>
      </footer>
    </div>
  );
}
