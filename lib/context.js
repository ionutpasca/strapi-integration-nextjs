import { createContext } from 'react'

export const ContextMap = {}

export const createMapContext = (contextId) => {
  const context = createContext(contextId)
  ContextMap[contextId] = context
  return context
}
