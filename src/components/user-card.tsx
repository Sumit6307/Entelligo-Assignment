"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Building2, ArrowRight, Check, Copy } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  const locationText = [user.address?.city, user.address?.country || "USA"].filter(Boolean).join(", ");
  const companyName = user.company?.name || "Independent";
  const jobTitle = user.company?.title || "Team Member";

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if user is clicking on copy email button or links
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

  return (
    <Card
      tabIndex={0}
      role="link"
      aria-label={`View profile for ${fullName}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="user-card-transition group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/50 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {/* Top Header Card Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <Avatar
              src={user.image}
              alt={fullName}
              fallback={initials}
              size="md"
              className="ring-2 ring-background group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {fullName}
              </h3>
              <p className="truncate text-xs font-medium text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </div>

          <Badge variant="accent" className="shrink-0 text-[10px] uppercase font-bold tracking-wider py-0.5 px-2">
            ID #{user.id}
          </Badge>
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
