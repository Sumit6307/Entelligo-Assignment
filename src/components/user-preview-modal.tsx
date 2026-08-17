"use client";

import React from "react";
import Link from "next/link";
import { X, Mail, Phone, MapPin, Building2, ExternalLink, Calendar, Heart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface UserPreviewModalProps {
  user: User | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function UserPreviewModal({ user, onClose, isFavorite, onToggleFavorite }: UserPreviewModalProps) {
  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  const location = [user.address?.city, user.address?.state, user.address?.country || "USA"].filter(Boolean).join(", ");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-2xl space-y-6">
        {/* Close & Favorite Actions */}
        <div className="flex items-center justify-between">
          <Badge variant="accent" className="text-xs uppercase font-bold tracking-wider">
            Quick Profile Preview
          </Badge>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(user.id)}
              className={`p-2 rounded-full border transition-all ${
                isFavorite
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                  : "bg-muted/50 border-border/60 text-muted-foreground hover:text-foreground"
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-500" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* User Identity Header */}
        <div className="flex items-start gap-4">
          <Avatar src={user.image} alt={fullName} fallback={initials} size="xl" className="ring-4 ring-primary/20 shrink-0" />
          <div className="min-w-0 space-y-1">
            <h2 className="text-xl font-bold text-foreground truncate">{fullName}</h2>
            <p className="text-sm font-semibold text-primary">@{user.username}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">{user.company?.title || "Team Member"} at {user.company?.name || "Organization"}</span>
            </p>
          </div>
        </div>

        {/* Quick Details Table */}
        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
              <Mail className="h-3.5 w-3.5 text-primary" /> Email
            </span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">{user.email}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
              <Phone className="h-3.5 w-3.5 text-primary" /> Phone
            </span>
            <span className="font-semibold text-foreground">{user.phone}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Location
            </span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">{location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-primary" /> Age & Gender
            </span>
            <span className="font-semibold text-foreground capitalize">{user.age} yrs ・ {user.gender}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl border-border/80">
            Close Preview
          </Button>

          <Link
            href={`/users/${user.id}`}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 px-4 py-2 gap-2 rounded-xl"
          >
            Full Detailed Profile <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
