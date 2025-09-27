export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="h-4 w-48 bg-muted rounded animate-pulse" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square w-full bg-muted rounded-lg animate-pulse" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-10 w-40 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
