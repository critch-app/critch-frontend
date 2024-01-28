import { LegacyRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface QueryWithInfiniteScroll {
  hasNextPage: boolean // Indicates whether more pages exist
  fetchNextPage(): void // Function to fetch the next page of data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInfiniteScroll(query: QueryWithInfiniteScroll): { ref: LegacyRef<any> } {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && query.hasNextPage) {
      query.fetchNextPage()
    }
  }, [inView, query.hasNextPage])

  return { ref }
}
