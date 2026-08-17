"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Briefcase, Copy, Check, Share2, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface ProfileHeroProps {
  user: User;
}

export function ProfileHero({ user }: ProfileHeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  const fullLocation = [user.address?.address, user.address?.city, user.address?.state, user.address?.country || "USA"]
    .filter(Boolean)
    .join(", ");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
      {/* Background Gradient Decorative Glow */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Back Button Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background shadow-2xs hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-xl gap-2 border-border/80"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Users
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleShareProfile}
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {copiedShare ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
          {copiedShare ? "Link Copied!" : "Share Profile"}
        </Button>
      </div>

      {/* Main Profile Info Row */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <Avatar
            src={user.image}
            alt={fullName}
            fallback={initials}
            size="xl"
            className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-primary/20 shadow-md shrink-0"
          />

          {/* User Names & Job */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {fullName}
              </h1>
              {user.role && (
                <Badge variant="accent" className="capitalize font-bold text-xs py-0.5 px-2.5">
                  <Sparkles className="h-3 w-3 mr-1" /> {user.role}
                </Badge>
              )}
            </div>

            <p className="text-sm font-semibold text-primary">
              @{user.username} <span className="text-muted-foreground font-normal">・ User ID #{user.id}</span>
            </p>

            {user.company && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <Briefcase className="h-3.5 w-3.5 text-primary" /> {user.company.title}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" /> {user.company.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Contact CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-border/60">
          <Button onClick={handleCopyEmail} variant="default" className="gap-2 rounded-xl shadow-xs flex-1 sm:flex-initial">
            {copiedEmail ? <Check className="h-4 w-4 text-emerald-300" /> : <Mail className="h-4 w-4" />}
            {copiedEmail ? "Email Copied!" : "Email User"}
          </Button>

          {user.phone && (
            <a
              href={`tel:${user.phone}`}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2 rounded-xl border-border/80 flex-1 sm:flex-initial"
            >
              <Phone className="h-4 w-4 text-primary" /> Call Phone
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
