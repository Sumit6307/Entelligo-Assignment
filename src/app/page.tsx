"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { UserGrid } from "@/components/user-grid";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { getUsers } from "@/lib/api";
import { User, FilterState } from "@/types/user";

const initialFilterState: FilterState = {
  searchQuery: "",
  sortBy: "none",
  selectedCity: "all",
  selectedCompany: "all",
  selectedGender: "all",
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

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

    // 1. Search Query (Name, Username, Email, Company, City)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const username = user.username?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const company = user.company?.name?.toLowerCase() || "";
        const city = user.address?.city?.toLowerCase() || "";

        return (
          fullName.includes(q) ||
          username.includes(q) ||
          email.includes(q) ||
          company.includes(q) ||
          city.includes(q)
        );
      });
    }

    // 2. City Filter
    if (filters.selectedCity !== "all") {
      result = result.filter((user) => user.address?.city === filters.selectedCity);
    }

    // 3. Company Filter
    if (filters.selectedCompany !== "all") {
      result = result.filter((user) => user.company?.name === filters.selectedCompany);
    }

    // 4. Gender Filter
    if (filters.selectedGender !== "all") {
      result = result.filter((user) => user.gender?.toLowerCase() === filters.selectedGender);
    }

    // 5. Sort By
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
  }, [users, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const isFiltered =
    filters.searchQuery !== "" ||
    filters.sortBy !== "none" ||
    filters.selectedCity !== "all" ||
    filters.selectedCompany !== "all" ||
    filters.selectedGender !== "all";

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <Header totalUsersCount={users.length} />

      <main className="flex-1 pb-16">
        <HeroSection
          totalCount={users.length}
          filteredCount={filteredUsers.length}
          isFiltered={isFiltered}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Controls Bar */}
          <SearchFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            cities={cities}
            companies={companies}
            resultCount={filteredUsers.length}
          />

          {/* Main Content States */}
          {loading ? (
            <LoadingSkeleton count={8} />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchUsersData} />
          ) : filteredUsers.length === 0 ? (
            <EmptyState searchQuery={filters.searchQuery} onReset={handleResetFilters} />
          ) : (
            <UserGrid users={filteredUsers} />
          )}
        </div>
      </main>

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
