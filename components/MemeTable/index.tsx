'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  getKeyValue,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import { MemeEditModal } from '../MemeEditModal'
import { Meme } from '@/types/meme'
import { useMemes } from '@/app/hooks/useMemes'

export function MemeTable() {
  const { memes, updateMeme } = useMemes()
  const [editingMeme, setEditingMeme] = useState<Meme | null>(null)
  const [localMemes, setLocalMemes] = useState<Meme[]>(memes)

  const handleLikeClick = async (meme: Meme) => {
    const updatedMeme = { ...meme, likes: meme.likes + 1 }
    setLocalMemes((prevMemes) =>
      prevMemes.map((m) => (m.id === meme.id ? updatedMeme : m))
    )
    await updateMeme(updatedMeme)
  }

  useEffect(() => {
    if (localMemes.length === 0) setLocalMemes(memes)
  }, [memes, localMemes])

  return (
    <>
      <Table
        aria-label="Memes table"
        isHeaderSticky
        classNames={{
          base: 'max-h-[520px] overflow-scroll',
          table: 'min-h-[420px]',
        }}
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="image">Image</TableColumn>
          <TableColumn key="likes">Likes</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={localMemes}>
          {(item: Meme) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                if (columnKey === 'actions') {
                  return (
                    <TableCell>
                      <Button onClick={() => setEditingMeme(item)}>Edit</Button>
                    </TableCell>
                  )
                }
                if (columnKey === 'likes') {
                  return (
                    <TableCell>
                      <Button
                        onClick={() => handleLikeClick(item)}
                        className="text-center"
                      >
                        {`❤️ ${item.likes}`}
                      </Button>
                    </TableCell>
                  )
                }
                if (columnKey === 'image') {
                  return (
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        radius="md"
                        className="object-contain min-h-[64px] min-w-[64px]"
                      />
                    </TableCell>
                  )
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editingMeme && (
        <MemeEditModal
          meme={editingMeme}
          onClose={() => setEditingMeme(null)}
        />
      )}
    </>
  )
}
