'use client'

import { useEffect, useState } from 'react'
import { Meme } from '@/types/meme'
import { useMemesContext } from '@/app/context/MemeContext'

export function useMemes() {
  const { memes, updateMeme: updateMemesInContext } = useMemesContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('/api/memes')
        const data = await response.json()

        if (response.ok) {
          updateMemesInContext(data.memes || [])
        } else {
          setError(data.error || 'Error load meme')
        }
      } catch (err) {
        setError('Error load meme')
      } finally {
        setLoading(false)
      }
    }

    fetchMemes()
  }, [])

  const updateMeme = async (updated: Meme) => {
    try {
      const res = await fetch(`/api/memes/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })

      if (!res.ok) {
        throw new Error('Error updating meme')
      }

      const updatedMeme = await res.json()
      updateMemesInContext(
        memes.map((m) => (m.id === updated.id ? updatedMeme : m))
      )
    } catch (error) {
      setError('Error updating meme')
    }
  }

  return { memes, updateMeme, loading, error }
}
