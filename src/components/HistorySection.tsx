import { TranslatorCard } from "./TranslatorCard";
import { History, Trash2, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface HistoryItem {
  term: string;
  translation: string;
  timestamp: Date;
}

interface HistorySectionProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onReloadItem?: (term: string, translation: string) => void;
}

export const HistorySection = ({ history, onClearHistory, onReloadItem }: HistorySectionProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copiado para a área de transferência!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Erro ao copiar texto");
    }
  };

  const handleReload = (item: HistoryItem) => {
    if (onReloadItem) {
      onReloadItem(item.term, item.translation);
      toast.info("Item recarregado no tradutor");
      
      // Scroll to translator
      const translatorSection = document.querySelector("#tradutor");
      if (translatorSection) {
        translatorSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (history.length === 0) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-primary" />
          <h2>Histórico de Traduções</h2>
        </div>
        
        <div className="text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
          <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Nenhuma tradução ainda
          </h3>
          <p className="text-muted-foreground">
            Suas traduções aparecerão aqui automaticamente
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-primary" />
          <h2>Histórico de Traduções</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            {history.length}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearHistory}
        >
          <Trash2 />
          Limpar Histórico
        </Button>
      </div>

      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={index}
            className="animate-fade-in bg-card border-2 border-border rounded-xl p-4 hover:shadow-custom-md transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-accent font-mono text-lg">{item.term}</h4>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {item.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                  {item.translation}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReload(item)}
                  className="hover:bg-primary/10 hover:text-primary"
                  title="Recarregar no tradutor"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(`${item.term}\n\n${item.translation}`, index)}
                  className="hover:bg-primary/10 hover:text-primary"
                  title="Copiar tradução"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
