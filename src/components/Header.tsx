import { useState } from "react";
import { Binary, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("tradutor");

  const navItems = [
    { id: "tradutor", label: "Tradutor", href: "#tradutor" },
    { id: "exemplos", label: "Exemplos", href: "#exemplos" },
    { id: "tutorial", label: "Tutorial", href: "#tutorial" },
    { id: "historico", label: "Histórico", href: "#historico" },
    { id: "sobre", label: "Sobre", href: "#sobre" },
  ];

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-custom" role="banner">
      <a href="#tradutor" className="skip-to-content">
        Pular para o conteúdo principal
      </a>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
              <Binary className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-base sm:text-lg font-bold text-accent">Tradutor CPC</h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Lógica Proposicional</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`
                  px-3 lg:px-4 py-2 rounded-lg font-semibold text-xs lg:text-sm transition-all duration-200
                  hover:bg-muted hover:text-accent focus-ring-strong touch-target
                  ${activeSection === item.id 
                    ? "bg-primary text-primary-foreground shadow-custom-sm" 
                    : "text-foreground"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden touch-target focus-ring-strong"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"}
          `}
          role="navigation"
          aria-label="Navegação mobile"
        >
          <nav className="flex flex-col gap-2 py-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`
                  px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200
                  hover:bg-muted hover:text-accent focus-ring-strong touch-target
                  ${activeSection === item.id 
                    ? "bg-primary text-primary-foreground shadow-custom-sm" 
                    : "text-foreground"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
