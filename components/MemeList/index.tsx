'use client'

import React from 'react'
import { Card, Image } from '@heroui/react'
import { useMemes } from '@/app/hooks/useMemes'
import { CardHeader } from '@heroui/card'

export function MemeList() {
  const { memes } = useMemes()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <Card className="h-[300px] relative" key={meme.id}>
          <CardHeader className="absolute z-20 flex-col items-start p-2 bg-black bg-opacity-50">
            <p className="text-tiny text-white uppercase font-bold">
              {meme.name}
            </p>
            <h4 className="text-white font-light text-large">{`❤️ ${meme.likes}`}</h4>
            <a
              href={meme.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              View
            </a>
          </CardHeader>
          <Image
            removeWrapper
            src={meme.image}
            alt={meme.name}
            className="w-full h-full object-cover rounded"
          />
        </Card>
      ))}
    </div>
  )
}
