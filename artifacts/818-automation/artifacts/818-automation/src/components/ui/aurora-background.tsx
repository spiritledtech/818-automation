"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-background text-foreground transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--aurora-1:repeating-linear-gradient(100deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.03)_7%,transparent_10%,transparent_12%,rgba(255,255,255,0.03)_16%)]
            [--aurora-2:repeating-linear-gradient(100deg,rgba(180,180,180,0.08)_10%,rgba(120,120,120,0.05)_15%,rgba(200,200,200,0.06)_20%,rgba(100,100,100,0.04)_25%,rgba(160,160,160,0.07)_30%)]
            [background-image:var(--aurora-1),var(--aurora-2)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[''] after:absolute after:inset-0
            after:[background-image:var(--aurora-1),var(--aurora-2)]
            after:[background-size:200%,_100%]
            after:animate-aurora
            after:[background-attachment:fixed]
            after:mix-blend-screen
            pointer-events-none
            absolute -inset-[10px] opacity-40 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_0%,black_20%,transparent_75%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
};
