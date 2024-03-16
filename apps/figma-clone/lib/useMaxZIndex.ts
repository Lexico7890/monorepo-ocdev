import { useMemo } from 'react'

import { useThreads } from '@/liveblocks.config'

// Returns the highest z-index of all threads
export const useMaxZIndex = () => {
  // get all threads
  const { threads } = useThreads()

  // calculate the max z-index
  return useMemo(() => {
    let max = 0
    for (const thread of threads) {
      // @ts-expect-error Need to allow for the possibility that threads may not have a zIndex property
      if (thread.metadata.zIndex > max) {
        // @ts-expect-error Need to allow for the possibility that threads may not have a zIndex property
        max = thread.metadata.zIndex
      }
    }
    return max
  }, [threads])
}
