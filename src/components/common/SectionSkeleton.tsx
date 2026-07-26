import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <Card className="p-6 shadow-sm space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-64" />
      <div className="pt-3 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
    </Card>
  );
}
