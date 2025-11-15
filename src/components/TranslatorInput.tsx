import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TranslatorCard } from "./TranslatorCard";
import { ArrowRight, Loader2, ArrowLeftRight, Eraser } from "lucide-react";
import { toast } from "sonner";

interface TranslatorInputProps {
  onTranslate: (text: string, translation: string) => void;
  initialInput?: { formula: string; natural: string };
}

type TranslationMode = "cpc-to-nl" | "nl-to-cpc";

export const TranslatorInput = ({ onTranslate, initialInput }: TranslatorInputProps) => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<TranslationMode>("cpc-to-nl");

  // Update input when initialInput changes (from examples)
  useEffect(() => {
    if (initialInput) {
      if (mode === "cpc-to-nl" && initialInput.formula) {
        setInputText(initialInput.formula);
        setTranslatedText("");
      } else if (mode === "nl-to-cpc" && initialInput.natural) {
        setInputText(initialInput.natural);
        setTranslatedText("");
      }
    }
  }, [initialInput, mode]);

  const mockTranslationsCpcToNl: Record<string, string> = {
    "p ∧ q": "P E Q são ambos verdadeiros. É uma conjunção lógica - só é verdadeira quando as duas proposições são verdadeiras simultaneamente.",
    "p ∨ q": "P OU Q é verdadeiro (ou ambos). É uma disjunção lógica - basta que uma das proposições seja verdadeira.",
    "p → q": "SE P então Q. É uma implicação - quando P é verdadeiro, Q também deve ser. Se P é falso, a implicação é sempre verdadeira.",
    "¬p": "NÃO P. É a negação lógica - inverte o valor de verdade da proposição P.",
    "p ↔ q": "P se e somente se Q. É uma bicondicional - ambas têm o mesmo valor de verdade (ambas verdadeiras ou ambas falsas).",
    "(p ∧ q) → r": "SE (P E Q) então R. Quando P e Q são ambos verdadeiros, R também deve ser verdadeiro.",
    "¬(p ∨ q)": "NÃO (P OU Q). É equivalente a dizer que nem P nem Q são verdadeiros. Pela Lei de De Morgan, é o mesmo que (¬P ∧ ¬Q).",
    "p ∨ ¬p": "P OU NÃO P. Esta é uma tautologia (sempre verdadeira) - o princípio do terceiro excluído, uma proposição ou sua negação sempre é verdadeira.",
  };

  const mockTranslationsNlToCpc: Record<string, string> = {
    "p e q": "p ∧ q",
    "p ou q": "p ∨ q",
    "se p então q": "p → q",
    "não p": "¬p",
    "p se e somente se q": "p ↔ q",
    "p implica q": "p → q",
    "negação de p": "¬p",
    "conjunção de p e q": "p ∧ q",
    "disjunção de p e q": "p ∨ q",
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Por favor, digite algo para traduzir");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerInput = inputText.toLowerCase().trim();
    let translation = "";

    if (mode === "cpc-to-nl") {
      translation = mockTranslationsCpcToNl[lowerInput] || 
        `A fórmula "${inputText}" não foi reconhecida. Use operadores: ∧ (E), ∨ (OU), → (Implica), ¬ (Negação), ↔ (Bicondicional).`;
    } else {
      translation = mockTranslationsNlToCpc[lowerInput] || 
        `A expressão "${inputText}" não foi reconhecida. Tente: "p e q", "se p então q", "não p", etc.`;
    }
    
    setTranslatedText(translation);
    onTranslate(inputText, translation);
    setIsLoading(false);
    toast.success("Tradução concluída!");
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    toast.info("Campos limpos");
  };

  const toggleMode = () => {
    setMode(prev => prev === "cpc-to-nl" ? "nl-to-cpc" : "cpc-to-nl");
    setInputText("");
    setTranslatedText("");
    toast.info(mode === "cpc-to-nl" ? "Modo: Linguagem Natural → CPC" : "Modo: CPC → Linguagem Natural");
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 rounded-xl border-2 border-border/50 shadow-custom">
        <span className={`text-xs sm:text-sm font-bold transition-all duration-300 text-center ${mode === "cpc-to-nl" ? "text-primary scale-110" : "text-muted-foreground scale-100"}`}>
          CPC → Linguagem Natural
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMode}
          aria-label="Alternar modo de tradução"
          className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 active:scale-95 shadow-custom hover:shadow-custom-md group focus-ring-strong touch-target"
        >
          <ArrowLeftRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-180" />
          <span className="tooltip-text absolute -bottom-12 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs rounded-lg py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none" role="tooltip">
            Alternar modo
          </span>
        </Button>
        <span className={`text-xs sm:text-sm font-bold transition-all duration-300 text-center ${mode === "nl-to-cpc" ? "text-primary scale-110" : "text-muted-foreground scale-100"}`}>
          Linguagem Natural → CPC
        </span>
      </div>

      {/* Translation Interface */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        {/* Input Panel */}
        <div className="relative group animate-slide-up">
          <label 
            htmlFor="translator-input"
            className={`
              absolute left-3 sm:left-4 top-0 -translate-y-1/2 px-2 text-[10px] sm:text-xs font-semibold
              bg-background transition-all duration-300 z-10
              ${inputText ? "text-primary scale-105" : "text-muted-foreground scale-100"}
            `}
          >
            {mode === "cpc-to-nl" ? "Fórmula Proposicional" : "Linguagem Natural"}
          </label>
          
          <Textarea
            id="translator-input"
            placeholder={
              mode === "cpc-to-nl" 
                ? "Ex: p ∧ q, p → q, ¬(p ∨ q)..." 
                : "Ex: p e q, se p então q, não p..."
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            aria-label={mode === "cpc-to-nl" ? "Digite a fórmula proposicional" : "Digite em linguagem natural"}
            className={`
              min-h-[160px] sm:min-h-[200px] resize-none pt-5 sm:pt-6 text-sm sm:text-base
              border-2 transition-all duration-300
              focus:border-primary focus:shadow-custom-md focus:scale-[1.01]
              hover:border-primary/50 focus-ring-strong
              ${mode === "cpc-to-nl" ? "font-mono" : ""}
              ${inputText ? "border-primary/50" : ""}
            `}
          />
        </div>

        {/* Output Panel */}
        <div className="relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <label 
            className={`
              absolute left-3 sm:left-4 top-0 -translate-y-1/2 px-2 text-[10px] sm:text-xs font-semibold
              bg-background transition-all duration-300 z-10
              ${translatedText ? "text-primary scale-105" : "text-muted-foreground scale-100"}
            `}
          >
            {mode === "cpc-to-nl" ? "Tradução Simplificada" : "Fórmula CPC"}
          </label>
          
          <div 
            className={`
              min-h-[160px] sm:min-h-[200px] p-3 sm:p-4 pt-5 sm:pt-6 rounded-lg border-2 border-border
              bg-muted/30 transition-all duration-300
              ${translatedText ? "border-primary/50 shadow-custom" : ""}
              ${mode === "nl-to-cpc" ? "font-mono text-xl sm:text-2xl flex items-center justify-center" : ""}
            `}
            role="region"
            aria-live="polite"
            aria-label="Resultado da tradução"
          >
            {translatedText ? (
              <p className={`text-foreground leading-relaxed text-sm sm:text-base animate-fade-in ${mode === "nl-to-cpc" ? "text-center" : ""}`}>
                {translatedText}
              </p>
            ) : (
              <p className="text-muted-foreground text-xs sm:text-sm text-center flex items-center justify-center min-h-[120px] sm:min-h-[160px] animate-pulse-soft">
                A tradução aparecerá aqui
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3 animate-slide-up flex-col sm:flex-row" style={{ animationDelay: "0.2s" }}>
        <Button
          onClick={handleTranslate}
          disabled={isLoading}
          className="flex-1 relative overflow-hidden group btn-press shadow-custom hover:shadow-custom-md focus-ring-strong touch-target"
          size="lg"
          aria-label="Traduzir texto"
        >
          <span className="absolute inset-0 bg-primary-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          <span className="relative z-10 text-sm sm:text-base">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span>Traduzindo...</span>
              </>
            ) : (
              <>
                <span>Traduzir</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </>
            )}
          </span>
        </Button>
        
        <Button
          onClick={handleClear}
          variant="outline"
          size="lg"
          disabled={isLoading}
          aria-label="Limpar campos"
          className="btn-press hover:border-destructive hover:text-destructive transition-all duration-300 shadow-custom-sm hover:shadow-custom group focus-ring-strong touch-target"
        >
          <Eraser className="group-hover:rotate-12 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          <span className="text-sm sm:text-base">Limpar</span>
        </Button>
      </div>
    </div>
  );
};
