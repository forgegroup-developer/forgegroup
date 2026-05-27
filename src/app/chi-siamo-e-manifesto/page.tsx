import Link from "next/link";

export default function Manifesto() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-brand-terra/30 bg-brand-nero/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-brand-bianco flex items-center">
            FORGE<span className="text-brand-corallo">GROUP</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/chi-siamo-e-manifesto" className="text-brand-corallo font-bold">Manifesto</Link>
            <Link href="/servizi" className="hover:text-brand-corallo transition-colors">Servizi</Link>
            <Link href="/casi-studio" className="hover:text-brand-corallo transition-colors">Casi Studio</Link>
            <Link href="/blog" className="hover:text-brand-corallo transition-colors">Intelligence</Link>
          </nav>
          <Link href="/contatti" className="bg-brand-corallo text-brand-nero px-6 py-2 rounded-sm font-bold hover:bg-brand-corallo/90 transition-all shadow-[4px_4px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            CANDIDA LA TUA AZIENDA
          </Link>
        </div>
      </header>

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Il Nostro <span className="text-brand-corallo">Manifesto</span></h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-2xl text-gray-300 font-medium leading-relaxed mb-12">
            Non siamo l'ennesima agenzia creativa. Siamo un'infrastruttura di acquisizione e vendita per aziende B2B che vogliono dominare il loro mercato.
          </p>

          <div className="bg-brand-terra/10 border-l-4 border-brand-corallo p-8 mb-12">
            <h2 className="text-2xl font-bold text-brand-bianco mb-4">I Nostri Valori Innegoziabili</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <strong className="text-brand-corallo mr-2">Fede:</strong> 
                <span className="text-gray-300">Crediamo in un ecosistema di business basato su principi solidi e invariabili.</span>
              </li>
              <li className="flex items-start">
                <strong className="text-brand-corallo mr-2">Integrità:</strong> 
                <span className="text-gray-300">Manteniamo le promesse. Se non possiamo aiutarti, non prenderemo i tuoi soldi.</span>
              </li>
              <li className="flex items-start">
                <strong className="text-brand-corallo mr-2">Verità:</strong> 
                <span className="text-gray-300">Nessuna vanità, solo numeri. Smascheriamo la fuffa del marketing moderno.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">I Nostri "Confini" (Chi NON accettiamo)</h2>
          <p className="text-gray-400 mb-6">
            Lavorare con noi è un privilegio reciproco. Per mantenere i nostri standard altissimi, rifiutiamo categoricamente di lavorare con:
          </p>
          <ul className="space-y-4 text-gray-300 mb-12">
            <li className="bg-brand-nero p-4 border border-brand-terra/30">❌ Aziende senza un track record dimostrabile o "start-up da un'idea".</li>
            <li className="bg-brand-nero p-4 border border-brand-terra/30">❌ Imprenditori che cercano la "bacchetta magica" in 30 giorni.</li>
            <li className="bg-brand-nero p-4 border border-brand-terra/30">❌ Realtà che vendono prodotti/servizi di scarsa qualità.</li>
            <li className="bg-brand-nero p-4 border border-brand-terra/30">❌ Aziende con fatturato annuo inferiore a 250.000€.</li>
          </ul>

          <div className="text-center mt-16 border-t border-brand-terra/30 pt-16">
            <h2 className="text-3xl font-bold mb-6">Sei in target e condividi i nostri valori?</h2>
            <Link href="/contatti" className="inline-block bg-brand-corallo text-brand-nero px-8 py-4 text-xl rounded-sm font-bold shadow-[6px_6px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
              INIZIA LA PREQUALIFICA
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-black py-12 border-t border-brand-terra/20 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Forge Group. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
