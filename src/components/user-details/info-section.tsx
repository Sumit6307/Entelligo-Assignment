import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DetailItem {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  copyable?: boolean;
}

interface InfoSectionProps {
  title: string;
  icon: LucideIcon;
  items: DetailItem[];
  badgeText?: string;
}

export function InfoSection({ title, icon: Icon, items, badgeText }: InfoSectionProps) {
  return (
    <Card className="rounded-2xl border border-border/80 bg-card shadow-xs transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-base font-bold text-foreground">{title}</CardTitle>
        </div>
        {badgeText && (
          <Badge variant="outline" className="text-xs font-medium border-border/80">
            {badgeText}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-6 pt-5">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                {item.icon && <item.icon className="h-3.5 w-3.5 text-primary/70" />}
                {item.label}
              </dt>
              <dd className="text-sm font-medium text-foreground break-words">
                {item.value || <span className="text-muted-foreground italic font-normal">Not specified</span>}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
