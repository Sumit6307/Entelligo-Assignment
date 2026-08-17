import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  searchQuery?: string;
  onReset?: () => void;
}

export function EmptyState({ searchQuery, onReset }: EmptyStateProps) {
  return (
    <Card className="my-8 p-8 sm:p-12 text-center border-dashed border-border/80 bg-card/60 shadow-none">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchX className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">No users found</h3>
      <p className="mx-auto max-w-md text-sm text-muted-foreground mb-6 leading-relaxed">
        {searchQuery ? (
          <>
            No matching profiles found for <span className="font-semibold text-foreground">&quot;{searchQuery}&quot;</span>. Try refining your search query or removing active filters.
          </>
        ) : (
          "No users matched your current filter criteria. Try adjusting your active filters."
        )}
      </p>

      {onReset && (
        <Button onClick={onReset} variant="outline" className="gap-2 rounded-xl border-border/80">
          <RotateCcw className="h-4 w-4" /> Clear All Filters
        </Button>
      )}
    </Card>
  );
}
