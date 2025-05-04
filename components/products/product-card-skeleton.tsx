export default function ProductCardSkeleton() {
  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  )
}
