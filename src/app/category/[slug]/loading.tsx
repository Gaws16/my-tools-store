export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      <div className="h-5 w-48 bg-muted rounded animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-lg border animate-pulse bg-muted"
          />
        ))}
      </div>
    </div>
  );
}
