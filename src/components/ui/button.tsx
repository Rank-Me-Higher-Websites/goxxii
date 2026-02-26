import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 rounded-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline:
          "border-2 border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50 rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        ghost:
          "hover:bg-secondary hover:text-foreground rounded-lg",
        link:
          "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-primary/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 rounded-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        heroOutline:
          "border-2 border-foreground/30 bg-transparent text-foreground font-bold uppercase tracking-wider hover:bg-emerald-500/15 hover:border-emerald-400/50 hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all duration-300 rounded-lg",
        glass:
          "glass text-foreground font-medium hover:bg-muted/50 rounded-lg border-0",
        gradient:
          "bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-bold uppercase tracking-wider hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 rounded-lg",
        accent:
          "bg-accent text-accent-foreground font-semibold hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 rounded-lg",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-lg px-6 sm:px-10 text-base",
        xl: "h-16 rounded-xl px-8 sm:px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
