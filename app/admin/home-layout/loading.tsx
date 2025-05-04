import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function HomeLayoutLoading() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full mb-3" />
          ))}
        </CardContent>
      </Card>

      <div className="mt-8">
        <Skeleton className="h-8 w-32 mb-4" />
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-full max-w-md mb-4" />
            <div className="space-y-2 border rounded-md p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full mb-2" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
