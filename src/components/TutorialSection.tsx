import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const TutorialSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const symbols = [
    { symbol: "∧", name: "Conjunção", description: "E lógico", example: "p ∧ q", meaning: "P e Q são ambos verdadeiros" },
    { symbol: "∨", name: "Disjunção", description: "OU lógico", example: "p ∨ q", meaning: "P ou Q (ou ambos) é verdadeiro" },
    { symbol: "→", name: "Implicação", description: "Se...então", example: "p → q", meaning: "Se P então Q" },
    { symbol: "¬", name: "Negação", description: "NÃO lógico", example: "¬p", meaning: "Não P" },
    { symbol: "↔", name: "Bicondicional", description: "Se e somente se", example: "p ↔ q", meaning: "P se e somente se Q" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "O que é Cálculo Proposicional Clássico?",
      answer: "É um sistema formal de lógica que trabalha com proposições (afirmações que podem ser verdadeiras ou falsas) e operadores lógicos. É a base da lógica matemática e computacional."
    },
    {
      question: "Como usar este tradutor?",
      answer: "Digite uma fórmula proposicional (como 'p ∧ q') ou uma expressão em linguagem natural (como 'p e q'). Use o toggle para alternar entre os modos de tradução. Os exemplos podem ser clicados para preencher automaticamente os campos."
    },
    {
      question: "O que significa 'tautologia'?",
      answer: "Uma tautologia é uma fórmula que é sempre verdadeira, independentemente dos valores de verdade de suas proposições. Exemplo: p ∨ ¬p (P ou não P) é sempre verdadeira."
    },
    {
      question: "Qual a diferença entre ∧ e ∨?",
      answer: "∧ (conjunção) significa 'E' - requer que ambas proposições sejam verdadeiras. ∨ (disjunção) significa 'OU' - basta que uma das proposições seja verdadeira."
    },
    {
      question: "Como funciona a implicação (→)?",
      answer: "P → Q significa 'se P então Q'. É falsa apenas quando P é verdadeiro e Q é falso. Em todos os outros casos, é verdadeira."
    },
  ];

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2>Tutorial e Referência</h2>
      </div>

      {/* Explicação Visual */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-2xl p-8 border-2 border-primary/20">
        <h3 className="text-2xl font-bold text-accent mb-4">
          O que é Cálculo Proposicional?
        </h3>
        <div className="space-y-4 text-foreground leading-relaxed">
          <p>
            O <strong>Cálculo Proposicional Clássico (CPC)</strong> é um sistema formal usado para representar 
            e manipular proposições lógicas usando símbolos matemáticos. É fundamental para:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Ciência da Computação:</strong> Circuitos lógicos, programação, inteligência artificial</li>
            <li><strong>Matemática:</strong> Provas formais, teoria dos conjuntos</li>
            <li><strong>Filosofia:</strong> Argumentação lógica, análise de raciocínio</li>
          </ul>
        </div>
      </div>

      {/* Tabela de Símbolos */}
      <div>
        <h3 className="text-xl font-bold text-accent mb-4">Tabela de Símbolos Lógicos</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {symbols.map((item, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-custom-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl font-bold text-primary font-mono bg-primary/10 w-16 h-16 flex items-center justify-center rounded-lg">
                  {item.symbol}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-accent">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-mono bg-muted px-2 py-1 rounded">{item.example}</p>
                    <p className="text-xs text-muted-foreground">{item.meaning}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ com Accordion */}
      <div>
        <h3 className="text-xl font-bold text-accent mb-4">Perguntas Frequentes</h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-custom"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <h4 className="font-semibold text-accent pr-4">{item.question}</h4>
                <div className="text-primary">
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="px-6 pb-4 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
