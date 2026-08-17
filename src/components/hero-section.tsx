import { Users, Globe2, Building2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  totalCount?: number;
  filteredCount?: number;
  isFiltered?: boolean;
}

export function HeroSection({ totalCount = 0, filteredCount = 0, isFiltered = false }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" className="gap-1.5 py-1 px-3 text-xs font-medium">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>Modern SaaS Directory</span>
              </Badge>
              <Badge variant="outline" className="gap-1 text-xs text-muted-foreground border-border/80">
                <Globe2 className="h-3 w-3" /> Live Public API Data
              </Badge>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Discover people <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">at a glance.</span>
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              Browse detailed user profiles, discover organizational structures, and view comprehensive contact information in a clean, modern interface.
            </p>
          </div>

          {/* Stat Pill Box */}
          <div className="w-full md:w-auto mt-4 md:mt-0 flex items-center gap-4 rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur-xs">
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
        </div>
      </div>
    </section>
  );
}
