import { Binary } from "lucide-react";

export const TranslatorHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-accent py-10 sm:py-12 lg:py-16 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-custom-lg mb-6 sm:mb-8 animate-fade-in" role="banner">
      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 bg-primary-foreground/10 rounded-xl sm:rounded-2xl backdrop-blur-sm animate-bounce-in">
            <Binary className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4 animate-slide-up px-4">
          Agente IA - Tradutor CPC
        </h1>
        <p className="text-base sm:text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-slide-up px-4" style={{ animationDelay: "0.1s" }}>
          Traduza fórmulas do Cálculo Proposicional Clássico para linguagem natural e intuitiva
        </p>
      </div>
      
      {/* Decorative elements - hidden em mobile para performance */}
      <div className="hidden sm:block absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-spin-slow" aria-hidden="true" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse-soft" aria-hidden="true" />
    </div>
  );
};
