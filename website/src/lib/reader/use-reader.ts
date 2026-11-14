import { useContext } from 'react'

import { ReaderContext } from './reader-context'

export const useReader = () => {
  const value = useContext(ReaderContext)
  if (!value) throw new Error('useReader must be used inside <ReaderProvider>.')
  return value
}
