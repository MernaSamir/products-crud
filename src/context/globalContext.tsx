'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchCategories } from '../api/products'

// Context type
interface IGlobalContextProps {
  categories: string[]
}

// Create context with default value
// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<IGlobalContextProps>({
  categories: [],
})

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data) // safe, async
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }

    loadCategories()
  }, [])

  return (
    <GlobalContext.Provider value={{ categories }}>
      {children}
    </GlobalContext.Provider>
  )
}

// Hook to consume context
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext)
