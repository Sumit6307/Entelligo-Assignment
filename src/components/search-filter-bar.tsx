"use client";

import * as React from "react";
import { Search, X, ArrowUpDown, Filter, RotateCcw, Building, MapPin, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterState, SortOption } from "@/types/user";

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  cities: string[];
  companies: string[];
  resultCount: number;
}

export function SearchFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  cities,
  companies,
  resultCount,
}: SearchFilterBarProps) {
  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.sortBy !== "none" ||
    filters.selectedCity !== "all" ||
    filters.selectedCompany !== "all" ||
    filters.selectedGender !== "all";

  return (
    <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs transition-colors">
      {/* Top row: Search input + Primary Sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search by name, username, email, company, or city..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="pl-10 pr-10 h-11 bg-background text-sm font-normal rounded-xl border-border/80 focus-visible:ring-primary shadow-2xs"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Clear search text"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Selection */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground shrink-0 pl-1">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sort:</span>
          </div>
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
              <Filter className="h-3 w-3" /> Active Filters:
            </span>

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

            {filters.sortBy !== "none" && (
              <Badge variant="outline" className="gap-1.5 py-0.5 text-xs font-medium border-primary/40 text-primary">
                Sorted
                <button
                  onClick={() => onFilterChange({ sortBy: "none" })}
                  className="hover:text-destructive"
                  aria-label="Reset sorting"
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
