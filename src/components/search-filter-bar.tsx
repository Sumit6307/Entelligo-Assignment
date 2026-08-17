"use client";

import * as React from "react";
import { Search, X, Filter, RotateCcw, Building, MapPin, UserCheck, Heart, LayoutGrid, List, TableProperties } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterState, SortOption, ViewMode } from "@/types/user";

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  cities: string[];
  companies: string[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  favoritesCount: number;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export function SearchFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  cities,
  companies,
  viewMode,
  onViewModeChange,
  favoritesCount,
  searchInputRef,
}: SearchFilterBarProps) {
  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.sortBy !== "none" ||
    filters.selectedCity !== "all" ||
    filters.selectedCompany !== "all" ||
    filters.selectedGender !== "all" ||
    filters.showOnlyFavorites;

  return (
    <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs transition-colors">
      {/* Top row: Search input + View Mode Toggle + Favorites Pill */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input Box with Shortcut Hint */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search by name, username, email, company, or city... (Press / to focus)"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="pl-10 pr-20 h-11 bg-background text-sm font-normal rounded-xl border-border/80 focus-visible:ring-primary shadow-2xs"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {filters.searchQuery ? (
              <button
                onClick={() => onFilterChange({ searchQuery: "" })}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Clear search text"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* View Switcher & Favorites Toggle */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
          {/* Favorites Button Toggle */}
          <Button
            variant={filters.showOnlyFavorites ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange({ showOnlyFavorites: !filters.showOnlyFavorites })}
            className={`h-11 rounded-xl gap-2 text-xs font-semibold shadow-2xs ${
              filters.showOnlyFavorites
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "border-border/80 hover:text-rose-500 hover:border-rose-500/40"
            }`}
          >
            <Heart className={`h-4 w-4 ${filters.showOnlyFavorites ? "fill-white" : "text-rose-500"}`} />
            <span>Bookmarked</span>
            <span className="ml-0.5 rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">
              {favoritesCount}
            </span>
          </Button>

          {/* Sort Selection */}
          <div className="flex items-center gap-1.5">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="h-11 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs transition-colors cursor-pointer"
              aria-label="Sort users by attribute"
            >
              <option value="none">Default Sort</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="username-asc">Username (A → Z)</option>
              <option value="age-asc">Age (Youngest First)</option>
              <option value="age-desc">Age (Oldest First)</option>
              <option value="company-asc">Company Name (A → Z)</option>
            </select>
          </div>

          {/* View Mode Buttons (Grid / List / Compact) */}
          <div className="flex items-center rounded-xl border border-border/80 bg-background p-1 shadow-2xs">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "grid" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "list" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Table List View"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("compact")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "compact" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Compact View"
            >
              <TableProperties className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdowns Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-border/40">
        {/* City Filter */}
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:block" />
          <select
            value={filters.selectedCity}
            onChange={(e) => onFilterChange({ selectedCity: e.target.value })}
            className="w-full h-10 rounded-lg border border-border/80 bg-background px-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
            aria-label="Filter by City"
          >
            <option value="all">All Cities ({cities.length})</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Company Filter */}
        <div className="flex items-center gap-2">
          <Building className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:block" />
          <select
            value={filters.selectedCompany}
            onChange={(e) => onFilterChange({ selectedCompany: e.target.value })}
            className="w-full h-10 rounded-lg border border-border/80 bg-background px-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
            aria-label="Filter by Company"
          >
            <option value="all">All Companies ({companies.length})</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="flex items-center gap-2">
          <UserCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:block" />
          <select
            value={filters.selectedGender}
            onChange={(e) => onFilterChange({ selectedGender: e.target.value })}
            className="w-full h-10 rounded-lg border border-border/80 bg-background px-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
            aria-label="Filter by Gender"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges & Reset CTA */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Filter className="h-3 w-3" /> Active:
            </span>

            {filters.showOnlyFavorites && (
              <Badge variant="destructive" className="gap-1.5 py-0.5 text-xs font-medium bg-rose-500 text-white">
                Bookmarked Only
                <button
                  onClick={() => onFilterChange({ showOnlyFavorites: false })}
                  className="hover:text-black"
                  aria-label="Clear favorites filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.searchQuery && (
              <Badge variant="secondary" className="gap-1.5 py-0.5 text-xs font-medium">
                Search: &quot;{filters.searchQuery}&quot;
                <button
                  onClick={() => onFilterChange({ searchQuery: "" })}
                  className="hover:text-destructive"
                  aria-label="Clear search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.selectedCity !== "all" && (
              <Badge variant="secondary" className="gap-1.5 py-0.5 text-xs font-medium">
                City: {filters.selectedCity}
                <button
                  onClick={() => onFilterChange({ selectedCity: "all" })}
                  className="hover:text-destructive"
                  aria-label="Clear city filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.selectedCompany !== "all" && (
              <Badge variant="secondary" className="gap-1.5 py-0.5 text-xs font-medium">
                Company: {filters.selectedCompany}
                <button
                  onClick={() => onFilterChange({ selectedCompany: "all" })}
                  className="hover:text-destructive"
                  aria-label="Clear company filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.selectedGender !== "all" && (
              <Badge variant="secondary" className="gap-1.5 py-0.5 text-xs font-medium capitalize">
                Gender: {filters.selectedGender}
                <button
                  onClick={() => onFilterChange({ selectedGender: "all" })}
                  className="hover:text-destructive"
                  aria-label="Clear gender filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-7 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 px-2.5 ml-auto"
          >
            <RotateCcw className="h-3 w-3" /> Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
