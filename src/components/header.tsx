"use client";

import Link from "next/link";
import { Users, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  totalUsersCount?: number;
}

export function Header({ totalUsersCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white shadow-sm shadow-primary/20 group-hover:scale-105 transition-transform">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                User Directory
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <Sparkles className="h-2.5 w-2.5" /> v1.0
              </span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Discover and explore detailed profiles
            </span>
          </div>
        </Link>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {totalUsersCount !== undefined && totalUsersCount > 0 && (
            <Badge variant="accent" className="hidden sm:inline-flex items-center gap-1.5 py-1 px-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-xs">{totalUsersCount} Profiles Live</span>
            </Badge>
          )}

          <div className="h-4 w-[1px] bg-border/60 hidden sm:block" />

          {/* Theme Switcher */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
