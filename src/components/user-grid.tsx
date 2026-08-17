"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Eye, Heart } from "lucide-react";
import { User, ViewMode } from "@/types/user";
import { UserCard } from "@/components/user-card";
import { Avatar } from "@/components/ui/avatar";

interface UserGridProps {
  users: User[];
  viewMode: ViewMode;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPreview: (user: User) => void;
}

export function UserGrid({ users, viewMode, favorites, onToggleFavorite, onPreview }: UserGridProps) {
  const isFav = (id: number) => favorites.includes(id);

  // 1. Grid View
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isFavorite={isFav(user.id)}
            onToggleFavorite={onToggleFavorite}
            onPreview={onPreview}
          />
        ))}
      </div>
    );
  }

  // 2. Table List View
  if (viewMode === "list") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/60 bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-4 py-3.5">User</th>
                <th scope="col" className="px-4 py-3.5">Contact</th>
                <th scope="col" className="px-4 py-3.5">Company & Title</th>
                <th scope="col" className="px-4 py-3.5">Location</th>
                <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {users.map((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
                const location = [user.address?.city, user.address?.state].filter(Boolean).join(", ");

                return (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                    {/* User Profile */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar src={user.image} alt={fullName} fallback={initials} size="sm" />
                        <div>
                          <Link href={`/users/${user.id}`} className="font-bold text-foreground hover:text-primary transition-colors">
                            {fullName}
                          </Link>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">{user.email}</p>
                      <p>{user.phone}</p>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-3.5 text-xs">
                      <p className="font-semibold text-foreground">{user.company?.name || "Independent"}</p>
                      <p className="text-muted-foreground">{user.company?.title || "Member"}</p>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">
                      {location || "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onToggleFavorite(user.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isFav(user.id) ? "text-rose-500" : "text-muted-foreground hover:text-rose-500"
                          }`}
                          title="Bookmark"
                        >
                          <Heart className={`h-4 w-4 ${isFav(user.id) ? "fill-rose-500" : ""}`} />
                        </button>

                        <button
                          onClick={() => onPreview(user)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                          title="Quick preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <Link
                          href={`/users/${user.id}`}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                          title="View Full Profile"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3. Compact View
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {users.map((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;

        return (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar src={user.image} alt={fullName} fallback={initials} size="sm" />
              <div className="min-w-0">
                <Link href={`/users/${user.id}`} className="truncate text-sm font-bold text-foreground group-hover:text-primary transition-colors block">
                  {fullName}
                </Link>
                <p className="truncate text-xs text-muted-foreground">
                  {user.company?.title || user.company?.name || `@${user.username}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 pl-2">
              <button
                onClick={() => onToggleFavorite(user.id)}
                className={`p-1 rounded-md transition-colors ${
                  isFav(user.id) ? "text-rose-500" : "text-muted-foreground hover:text-rose-500"
                }`}
                title="Bookmark"
              >
                <Heart className={`h-3.5 w-3.5 ${isFav(user.id) ? "fill-rose-500" : ""}`} />
              </button>

              <Link
                href={`/users/${user.id}`}
                className="p-1 rounded-md text-muted-foreground hover:text-primary transition-colors"
                title="View details"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
