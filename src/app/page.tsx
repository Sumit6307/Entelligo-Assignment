"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { UserGrid } from "@/components/user-grid";
import { UserPreviewModal } from "@/components/user-preview-modal";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { getUsers } from "@/lib/api";
import { User, FilterState, ViewMode } from "@/types/user";

const initialFilterState: FilterState = {
  searchQuery: "",
  sortBy: "none",
  selectedCity: "all",
  selectedCompany: "all",
  selectedGender: "all",
  showOnlyFavorites: false,
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [previewUser, setPreviewUser] = useState<User | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load saved favorites & view mode from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("user_directory_favs");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedView = localStorage.getItem("user_directory_view_mode") as ViewMode;
      if (savedView && ["grid", "list", "compact"].includes(savedView)) {
        setViewMode(savedView);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("user_directory_favs", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Save viewMode to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("user_directory_view_mode", mode);
    } catch {
      // Ignore
    }
  };

  // Keyboard shortcut listener: Press "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch users from API
  const fetchUsersData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers(100);
      setUsers(response.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user directory.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Extract unique cities & companies for dropdown filters
  const cities = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      if (u.address?.city) set.add(u.address.city);
    });
    return Array.from(set).sort();
  }, [users]);

  const companies = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      if (u.company?.name) set.add(u.company.name);
    });
    return Array.from(set).sort();
  }, [users]);

  // Filter & Sort Logic
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // 1. Favorites Filter
    if (filters.showOnlyFavorites) {
      result = result.filter((user) => favorites.includes(user.id));
    }

    // 2. Search Query (Name, Username, Email, Company, City)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const username = user.username?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const company = user.company?.name?.toLowerCase() || "";
        const city = user.address?.city?.toLowerCase() || "";
        const title = user.company?.title?.toLowerCase() || "";

        return (
          fullName.includes(q) ||
          username.includes(q) ||
          email.includes(q) ||
          company.includes(q) ||
          city.includes(q) ||
          title.includes(q)
        );
      });
    }

    // 3. City Filter
    if (filters.selectedCity !== "all") {
      result = result.filter((user) => user.address?.city === filters.selectedCity);
    }

    // 4. Company Filter
    if (filters.selectedCompany !== "all") {
      result = result.filter((user) => user.company?.name === filters.selectedCompany);
    }

    // 5. Gender Filter
    if (filters.selectedGender !== "all") {
      result = result.filter((user) => user.gender?.toLowerCase() === filters.selectedGender);
    }

    // 6. Sort By
    if (filters.sortBy !== "none") {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case "name-asc":
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          case "name-desc":
            return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
          case "username-asc":
            return a.username.localeCompare(b.username);
          case "age-asc":
            return a.age - b.age;
          case "age-desc":
            return b.age - a.age;
          case "company-asc":
            return (a.company?.name || "").localeCompare(b.company?.name || "");
          default:
            return 0;
        }
      });
    }

    return result;
  }, [users, filters, favorites]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const handleTagClick = (tag: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: tag }));
    searchInputRef.current?.focus();
  };

  const isFiltered =
    filters.searchQuery !== "" ||
    filters.sortBy !== "none" ||
    filters.selectedCity !== "all" ||
    filters.selectedCompany !== "all" ||
    filters.selectedGender !== "all" ||
    filters.showOnlyFavorites;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <Header totalUsersCount={users.length} />

      <main className="flex-1 pb-16">
        <HeroSection
          totalCount={users.length}
          filteredCount={filteredUsers.length}
          isFiltered={isFiltered}
          favoritesCount={favorites.length}
          onTagClick={handleTagClick}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Search & Controls Bar */}
          <SearchFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            cities={cities}
            companies={companies}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            favoritesCount={favorites.length}
            searchInputRef={searchInputRef}
          />

          {/* Main Content States */}
          {loading ? (
            <LoadingSkeleton count={8} />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchUsersData} />
          ) : filteredUsers.length === 0 ? (
            <EmptyState searchQuery={filters.searchQuery} onReset={handleResetFilters} />
          ) : (
            <UserGrid
              users={filteredUsers}
              viewMode={viewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onPreview={(u) => setPreviewUser(u)}
            />
          )}
        </div>
      </main>

      {/* Quick Preview Modal */}
      <UserPreviewModal
        user={previewUser}
        onClose={() => setPreviewUser(null)}
        isFavorite={previewUser ? favorites.includes(previewUser.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30 py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} User Directory. Built with Next.js & Tailwind CSS.</p>
          <p className="font-medium text-foreground/80">Data powered by DummyJSON Public API</p>
        </div>
      </footer>
    </div>
  );
}
