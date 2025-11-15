import { useState } from "react";
import { Header } from "@/components/Header";
import { TranslatorHero } from "@/components/TranslatorHero";
import { TranslatorInput } from "@/components/TranslatorInput";
import { ExamplesSection } from "@/components/ExamplesSection";
import { HistorySection } from "@/components/HistorySection";
import { TutorialSection } from "@/components/TutorialSection";
import { ExamplesBank } from "@/components/ExamplesBank";

interface HistoryItem {
  term: string;
  translation: string;
  timestamp: Date;
}

const Index = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentInput, setCurrentInput] = useState({ formula: "", natural: "" });

  const handleTranslation = (term: string, translation: string) => {
    setHistory(prev => [
      { term, translation, timestamp: new Date() },
      ...prev.slice(0, 9), // Keep only last 10 items
    ]);
  };

  const handleExampleClick = (term: string) => {
    // Scroll to translator input
    const translatorSection = document.querySelector("#tradutor");
    if (translatorSection) {
      translatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExampleSelect = (formula: string, natural: string) => {
    setCurrentInput({ formula, natural });
  };

  const handleReloadItem = (term: string, translation: string) => {
    // This would ideally populate the translator fields
    setCurrentInput({ formula: term, natural: translation });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Add padding-top to account for fixed header */}
      <div className="pt-14 sm:pt-16">
        <div className="container mx-auto mobile-padding py-6 sm:py-8 max-w-6xl">
          <section id="tradutor" className="scroll-mt-20">
            <TranslatorHero />
            <TranslatorInput 
              onTranslate={handleTranslation}
              initialInput={currentInput}
            />
          </section>
          
          <section id="exemplos" className="scroll-mt-20">
            <ExamplesBank onExampleSelect={handleExampleSelect} />
          </section>

          <section id="tutorial" className="scroll-mt-20">
            <TutorialSection />
          </section>
          
          <section id="historico" className="scroll-mt-20">
            <HistorySection 
              history={history} 
              onClearHistory={handleClearHistory}
              onReloadItem={handleReloadItem}
            />
          </section>

          <section id="sobre" className="scroll-mt-20 mt-8 sm:mt-12">
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-border animate-fade-in">
              <h2 className="mb-3 sm:mb-4">Sobre o Tradutor CPC</h2>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-sm sm:text-base">
                  O <strong className="text-foreground">Tradutor de Cálculo Proposicional Clássico</strong> foi desenvolvido 
                  para facilitar o aprendizado de lógica matemática, convertendo fórmulas formais em linguagem natural 
                  compreensível e vice-versa.
                </p>
                <p className="text-sm sm:text-base">
                  Ideal para estudantes de computação, matemática e filosofia que desejam entender melhor 
                  os operadores lógicos e suas aplicações práticas.
                </p>
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4 flex-wrap">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-lg text-primary font-semibold text-xs sm:text-sm touch-target">
                    ∧ Conjunção
                  </div>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-lg text-primary font-semibold text-xs sm:text-sm touch-target">
                    ∨ Disjunção
                  </div>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-lg text-primary font-semibold text-xs sm:text-sm touch-target">
                    → Implicação
                  </div>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-lg text-primary font-semibold text-xs sm:text-sm touch-target">
                    ¬ Negação
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
