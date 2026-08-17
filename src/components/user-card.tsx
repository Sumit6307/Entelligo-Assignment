"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Building2, ArrowRight, Check, Copy, Eye, Heart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onPreview: (user: User) => void;
}

export function UserCard({ user, isFavorite, onToggleFavorite, onPreview }: UserCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  const locationText = [user.address?.city, user.address?.country || "USA"].filter(Boolean).join(", ");
  const companyName = user.company?.name || "Independent";
  const jobTitle = user.company?.title || "Team Member";

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".no-card-navigate")) {
      return;
    }
    router.push(`/users/${user.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/users/${user.id}`);
    }
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(user);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(user.id);
  };

  return (
    <Card
      tabIndex={0}
      role="link"
      aria-label={`View profile for ${fullName}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="user-card-glow group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {/* Top Card Controls Bar: Favorite Heart & Quick Preview Eye */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <Avatar
                src={user.image}
                alt={fullName}
                fallback={initials}
                size="md"
                className="ring-2 ring-background group-hover:ring-primary/50 transition-all duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-card" title="Active Member" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {fullName}
              </h3>
              <p className="truncate text-xs font-medium text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </div>

          <div className="no-card-navigate flex items-center gap-1">
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                  : "bg-background/80 border-border/60 text-muted-foreground hover:text-rose-500 hover:bg-muted"
              }`}
              title={isFavorite ? "Remove from bookmarks" : "Bookmark profile"}
              aria-label="Bookmark user"
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-500" : ""}`} />
            </button>

            <button
              onClick={handlePreviewClick}
              className="p-1.5 rounded-lg border border-border/60 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Quick preview summary"
              aria-label="Quick preview summary"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Company & Job Title Section */}
        <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 transition-colors group-hover:bg-muted/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground truncate">
            <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{companyName}</span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate pl-5 mt-0.5">
            {jobTitle}
          </p>
        </div>

        {/* Contact & Location Chips */}
        <div className="space-y-2 text-xs text-muted-foreground pt-1">
          {/* Email with copy action */}
          <div className="flex items-center justify-between gap-2 group/email">
            <div className="flex items-center gap-2 truncate">
              <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <button
              onClick={copyEmail}
              className="no-card-navigate shrink-0 p-1 rounded hover:bg-background text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 group-hover/email:opacity-100 transition-opacity"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>

          {/* Location */}
          {locationText && (
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{locationText}</span>
            </div>
          )}

          {/* Phone */}
          {user.phone && (
            <div className="flex items-center gap-2 truncate">
              <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{user.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
          View Profile
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Card>
  );
}
