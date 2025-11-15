import { TranslatorCard } from "./TranslatorCard";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface Example {
  term: string;
  translation: string;
}

interface ExamplesSectionProps {
  onExampleClick: (term: string) => void;
}

export const ExamplesSection = ({ onExampleClick }: ExamplesSectionProps) => {
  const examples: Example[] = [
    {
      term: "p ∧ q",
      translation: "Conjunção: P E Q são ambos verdadeiros",
    },
    {
      term: "p → q",
      translation: "Implicação: SE P então Q",
    },
    {
      term: "¬p",
      translation: "Negação: NÃO P",
    },
    {
      term: "p ∨ q",
      translation: "Disjunção: P OU Q",
    },
  ];

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2>Exemplos Rápidos</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {examples.map((example, index) => (
          <TranslatorCard
            key={index}
            variant="default"
            className="hover:shadow-custom-md transition-shadow duration-300 cursor-pointer"
            onClick={() => onExampleClick(example.term)}
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-accent font-mono">{example.term}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {example.translation}
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Usar este exemplo
              </Button>
            </div>
          </TranslatorCard>
        ))}
      </div>
    </div>
  );
};
