import { LegacyRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface QueryWithInfiniteScroll {
  hasNextPage: boolean
  fetchNextPage(): void
}
export function useInfiniteScroll(query: QueryWithInfiniteScroll): {
  ref: LegacyRef<any>
} {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && query.hasNextPage) {
      query.fetchNextPage()
    }
  }, [inView, query.hasNextPage])

  return { ref }
}
