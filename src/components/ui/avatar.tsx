"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({ src, alt = "Avatar", fallback = "U", size = "md", className, ...props }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-16 w-16 text-lg font-semibold",
    xl: "h-24 w-24 text-2xl font-bold",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted shadow-xs transition-transform duration-200",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-secondary text-primary font-semibold uppercase select-none">
          {fallback}
        </div>
      )}
    </div>
  );
}
