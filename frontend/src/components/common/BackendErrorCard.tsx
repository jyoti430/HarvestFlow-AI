import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function BackendErrorCard({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="flex min-h-64 items-center justify-center p-6 text-center shadow-sm">
      <div className="max-w-md space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-warning/15 text-warning">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold">Unable to connect to HarvestFlow backend</h2>
          <p className="text-sm text-muted-foreground">
            The backend may still be starting or is temporarily unavailable.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </Button>
      </div>
    </Card>
  );
}
