import { useState } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Example {
  formula: string;
  natural: string;
  category: string;
  color: string;
  tooltip: string;
}

interface ExamplesBankProps {
  onExampleSelect: (formula: string, natural: string) => void;
}

export const ExamplesBank = ({ onExampleSelect }: ExamplesBankProps) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const examples: Example[] = [
    {
      formula: "p ∧ q",
      natural: "p e q",
      category: "Conjunção",
      color: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500 text-blue-700 dark:text-blue-300",
      tooltip: "Ambas proposições devem ser verdadeiras"
    },
    {
      formula: "p ∨ q",
      natural: "p ou q",
      category: "Disjunção",
      color: "bg-green-500/10 border-green-500/30 hover:border-green-500 text-green-700 dark:text-green-300",
      tooltip: "Pelo menos uma proposição deve ser verdadeira"
    },
    {
      formula: "p → q",
      natural: "se p então q",
      category: "Implicação",
      color: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500 text-purple-700 dark:text-purple-300",
      tooltip: "Se P é verdadeiro, Q também deve ser"
    },
    {
      formula: "¬p",
      natural: "não p",
      category: "Negação",
      color: "bg-red-500/10 border-red-500/30 hover:border-red-500 text-red-700 dark:text-red-300",
      tooltip: "Inverte o valor de verdade de P"
    },
    {
      formula: "p ↔ q",
      natural: "p se e somente se q",
      category: "Bicondicional",
      color: "bg-orange-500/10 border-orange-500/30 hover:border-orange-500 text-orange-700 dark:text-orange-300",
      tooltip: "P e Q têm o mesmo valor de verdade"
    },
    {
      formula: "(p ∧ q) → r",
      natural: "se (p e q) então r",
      category: "Composta",
      color: "bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-500 text-indigo-700 dark:text-indigo-300",
      tooltip: "Combinação de conjunção e implicação"
    },
    {
      formula: "¬(p ∨ q)",
      natural: "não (p ou q)",
      category: "Composta",
      color: "bg-pink-500/10 border-pink-500/30 hover:border-pink-500 text-pink-700 dark:text-pink-300",
      tooltip: "Negação de uma disjunção (Lei de De Morgan)"
    },
    {
      formula: "p ∨ ¬p",
      natural: "p ou não p",
      category: "Tautologia",
      color: "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500 text-yellow-700 dark:text-yellow-300",
      tooltip: "Sempre verdadeira (Princípio do Terceiro Excluído)"
    },
  ];

  const categories = Array.from(new Set(examples.map(e => e.category)));

  const handleExampleClick = (example: Example) => {
    onExampleSelect(example.formula, example.natural);
    toast.success(`Exemplo "${example.category}" carregado!`);
    
    // Scroll to translator
    const translatorSection = document.querySelector("#tradutor");
    if (translatorSection) {
      translatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-primary" />
        <h2>Banco de Exemplos</h2>
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
      </div>

      <p className="text-muted-foreground mb-6">
        Clique em qualquer exemplo para carregá-lo automaticamente no tradutor
      </p>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {category}
              </span>
            </h3>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {examples
                .filter(ex => ex.category === category)
                .map((example, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setActiveTooltip(index)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <button
                      onClick={() => handleExampleClick(example)}
                      className={`
                        w-full text-left p-4 rounded-xl border-2 transition-all duration-300
                        hover:scale-105 hover:shadow-custom-md active:scale-95
                        ${example.color}
                      `}
                    >
                      <div className="space-y-2">
                        <div className="font-mono text-lg font-bold">
                          {example.formula}
                        </div>
                        <div className="text-sm opacity-80">
                          {example.natural}
                        </div>
                      </div>
                    </button>

                    {/* Tooltip */}
                    {activeTooltip === index && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-accent text-accent-foreground text-xs rounded-lg shadow-custom-lg whitespace-nowrap z-10 animate-fade-in">
                        {example.tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-accent" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
