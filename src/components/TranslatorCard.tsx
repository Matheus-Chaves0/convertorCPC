import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TranslatorCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  variant?: "default" | "elevated" | "bordered";
  className?: string;
  onClick?: () => void;
}

export const TranslatorCard = ({ 
  title, 
  description, 
  children, 
  variant = "default",
  className,
  onClick
}: TranslatorCardProps) => {
  const variantClasses = {
    default: "shadow-custom",
    elevated: "shadow-custom-lg hover:shadow-custom-md transition-shadow duration-300",
    bordered: "border-2 border-border shadow-custom-sm"
  };

  return (
    <Card className={cn(variantClasses[variant], className)} onClick={onClick}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-xl">{title}</CardTitle>}
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={!title && !description ? "pt-6" : ""}>
        {children}
      </CardContent>
    </Card>
  );
};
