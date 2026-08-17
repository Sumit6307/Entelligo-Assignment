import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Unable to load users",
  message = "We couldn't retrieve the user directory right now. Please check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="mx-auto max-w-lg my-8 p-8 text-center border-destructive/20 bg-destructive/5 shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} variant="default" className="gap-2 px-6 rounded-xl shadow-sm">
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
      )}
    </Card>
  );
}
