import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar Skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <Skeleton className="h-11 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="flex flex-col justify-between p-5 space-y-4 border border-border/60">
            <div className="space-y-4">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 rounded-full shrink-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                  </div>
                </div>
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>

              {/* Company Box Skeleton */}
              <div className="rounded-xl border border-border/40 p-2.5 space-y-1.5 bg-muted/20">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>

              {/* Contact Skeletons */}
              <div className="space-y-2 pt-1">
                <Skeleton className="h-3.5 w-44 rounded" />
                <Skeleton className="h-3.5 w-36 rounded" />
                <Skeleton className="h-3.5 w-32 rounded" />
              </div>
            </div>

            {/* Footer Skeleton */}
            <div className="pt-3 border-t border-border/40 flex items-center justify-between">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-7 w-7 rounded-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
