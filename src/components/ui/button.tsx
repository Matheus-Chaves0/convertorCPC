import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:grayscale active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-custom hover:bg-primary-hover active:bg-primary-active",
        secondary: "bg-secondary text-secondary-foreground shadow-custom-sm hover:bg-secondary-hover active:bg-secondary-hover/80",
        outline: "border-2 border-border bg-transparent text-foreground hover:bg-muted hover:border-muted-foreground active:bg-muted/80",
        ghost: "text-foreground hover:bg-muted active:bg-muted/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-xs sm:text-sm min-h-[36px]",
        default: "h-10 px-4 sm:px-5 text-sm min-h-[40px]",
        lg: "h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base min-h-[44px]",
        icon: "h-10 w-10 min-h-[40px] min-w-[40px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
