export default function ProductLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#EA0232] to-[#CE5564] py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-48 rounded bg-white/20" />
            <div className="h-12 w-96 max-w-full rounded bg-white/20" />
            <div className="h-6 w-72 max-w-full rounded bg-white/15" />
            <div className="h-20 w-full max-w-xl rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 rounded bg-secondary" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-secondary" />
            <div className="h-4 w-5/6 rounded bg-secondary" />
            <div className="h-4 w-4/6 rounded bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
