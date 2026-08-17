"use client";

import { Users, Globe2, Sparkles, Heart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  totalCount?: number;
  filteredCount?: number;
  isFiltered?: boolean;
  favoritesCount?: number;
  onTagClick?: (tag: string) => void;
}

export function HeroSection({
  totalCount = 0,
  filteredCount = 0,
  isFiltered = false,
  favoritesCount = 0,
  onTagClick,
}: HeroSectionProps) {
  const quickTags = ["Engineering", "Sales", "Manager", "New York", "Chicago"];

  return (
    <section className="relative overflow-hidden py-8 sm:py-12 border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" className="gap-1.5 py-1 px-3 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Next-Level User Directory</span>
              </Badge>
              <Badge variant="outline" className="gap-1 text-xs text-muted-foreground border-border/80">
                <Globe2 className="h-3 w-3" /> Live Public API
              </Badge>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Discover people <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">at a glance.</span>
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              Browse detailed user profiles, explore organizational roles, filter by city or company, and bookmark key contacts in a sleek modern interface.
            </p>

            {/* Quick Interactive Search Tags */}
            {onTagClick && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
                <span className="font-semibold flex items-center gap-1">
                  <Search className="h-3 w-3 text-primary" /> Popular tags:
                </span>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all shadow-2xs"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stat Pill Box Grid */}
          <div className="w-full md:w-auto mt-2 md:mt-0 flex flex-wrap sm:flex-nowrap items-center gap-4">
            <div className="flex-1 sm:flex-initial flex items-center gap-4 rounded-2xl border border-border/80 bg-card/80 p-4 shadow-xs backdrop-blur-xs hover:border-primary/40 transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black tracking-tight text-foreground">
                    {isFiltered ? filteredCount : totalCount}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    {isFiltered ? `of ${totalCount}` : "Total"} Users
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isFiltered ? "Matching active search & filters" : "Loaded dynamically from API"}
                </p>
              </div>
            </div>

            {favoritesCount > 0 && (
              <div className="flex-1 sm:flex-initial flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 shadow-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                  <Heart className="h-5 w-5 fill-rose-500" />
                </div>
                <div>
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    {favoritesCount}
                  </span>
                  <p className="text-[11px] text-muted-foreground font-medium">Bookmarked</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
