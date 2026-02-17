import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
}

const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant = "outline", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "rounded-none uppercase tracking-widest text-xs font-semibold px-8 py-6 transition-all duration-500",
          variant === "outline" && "bg-transparent border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary",
          variant === "solid" && "bg-primary text-primary-foreground hover:bg-white hover:text-black",
          className
        )}
        {...props}
      />
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";

export { LuxuryButton };
