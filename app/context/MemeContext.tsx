'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { Meme } from '@/types/meme'

type MemeContextType = {
  memes: Meme[]
  updateMeme: (updated: Meme[]) => void
}

const MemeContext = createContext<MemeContextType | undefined>(undefined)

export function MemeProvider({ children }: { children: ReactNode }) {
  const [memes, setMemes] = useState<Meme[]>([])

  const updateMeme = (updatedMemes: Meme[]) => {
    setMemes(updatedMemes)
  }

  return (
    <MemeContext.Provider value={{ memes, updateMeme }}>
      {children}
    </MemeContext.Provider>
  )
}

export function useMemesContext() {
  const context = useContext(MemeContext)
  if (!context) {
    throw new Error('useMemesContext must be used within a MemeProvider')
  }
  return context
}
