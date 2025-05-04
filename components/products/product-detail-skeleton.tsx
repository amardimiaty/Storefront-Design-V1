export default function ProductDetailSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <div className="space-y-4">
        <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square w-16 sm:w-20 rounded bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse" />
          <div className="h-8 w-3/4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
          <div className="h-6 w-1/3 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-6 w-1/4 rounded bg-gray-200 animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 rounded bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-32 rounded bg-gray-200 animate-pulse" />
          <div className="h-10 w-32 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
