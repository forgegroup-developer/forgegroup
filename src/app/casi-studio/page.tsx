import Link from "next/link";

export default function CasiStudio() {
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
            <Link href="/casi-studio" className="text-brand-corallo font-bold">Casi Studio</Link>
            <Link href="/blog" className="hover:text-brand-corallo transition-colors">Intelligence</Link>
          </nav>
          <Link href="/contatti" className="bg-brand-corallo text-brand-nero px-6 py-2 rounded-sm font-bold hover:bg-brand-corallo/90 transition-all shadow-[4px_4px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            CANDIDA LA TUA AZIENDA
          </Link>
        </div>
      </header>

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Risultati <span className="text-brand-corallo">Dimostrabili</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Zero teorie, solo numeri. Come abbiamo trasformato l'infrastruttura di acquisizione in vari settori chiave.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-brand-nero border border-brand-terra/50 rounded-lg overflow-hidden group cursor-pointer hover:border-brand-corallo transition-all">
            <div className="h-48 bg-gradient-to-br from-brand-terra/20 to-black p-6 flex items-end">
              <h3 className="text-3xl font-black text-brand-bianco opacity-50 group-hover:opacity-100 transition-opacity">Software B2B</h3>
            </div>
            <div className="p-6">
              <div className="text-brand-corallo font-bold text-2xl mb-2">+140% MRR</div>
              <p className="text-gray-400">Implementazione sistema SaaS per Enterprise.</p>
            </div>
          </div>

          <div className="bg-brand-nero border border-brand-terra/50 rounded-lg overflow-hidden group cursor-pointer hover:border-brand-corallo transition-all">
            <div className="h-48 bg-gradient-to-br from-brand-terra/20 to-black p-6 flex items-end">
              <h3 className="text-3xl font-black text-brand-bianco opacity-50 group-hover:opacity-100 transition-opacity">Edilizia High-Ticket</h3>
            </div>
            <div className="p-6">
              <div className="text-brand-corallo font-bold text-2xl mb-2">+850K€ Pipeline</div>
              <p className="text-gray-400">Generazione appalti qualificati B2B in soli 90 giorni.</p>
            </div>
          </div>

          <div className="bg-brand-nero border border-brand-terra/50 rounded-lg overflow-hidden group cursor-pointer hover:border-brand-corallo transition-all">
            <div className="h-48 bg-gradient-to-br from-brand-terra/20 to-black p-6 flex items-end">
              <h3 className="text-3xl font-black text-brand-bianco opacity-50 group-hover:opacity-100 transition-opacity">Settore Hotel & Hospitality</h3>
            </div>
            <div className="p-6">
              <div className="text-brand-corallo font-bold text-2xl mb-2">-40% Costo Acq.</div>
              <p className="text-gray-400">Ottimizzazione conversioni per gruppi alberghieri B2B.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contatti" className="inline-block bg-transparent border-2 border-brand-corallo text-brand-corallo px-8 py-4 text-lg rounded-sm font-bold hover:bg-brand-corallo hover:text-brand-nero transition-colors">
            VOGLIO QUESTI RISULTATI
          </Link>
        </div>
      </main>

      <footer className="bg-black py-12 border-t border-brand-terra/20 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Forge Group. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
