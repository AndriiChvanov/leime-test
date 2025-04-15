'use client'

import React, { useCallback, useState } from 'react'
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'
import { Meme } from '@/types/meme'
import { useMemes } from '@/app/hooks/useMemes'

interface MemeEditModalProps {
  meme: Meme
  onClose: () => void
}

export function MemeEditModal({ meme, onClose }: MemeEditModalProps) {
  const { updateMeme } = useMemes()

  const [name, setName] = useState<string>(meme.name)
  const [image, setImage] = useState<string>(meme.image)

  const handleSave = useCallback(async () => {
    await updateMeme({
      ...meme,
      name,
      image,
    })
    onClose()
  }, [updateMeme, onClose, name, image, meme])

  const isValidImageUrl = useCallback(
    (url: string) => /^https?:\/\/.+\.(jpg|jpeg)$/i.test(url),
    []
  )

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Meme</ModalHeader>
        <ModalBody className="!overflow-y-auto !max-h-[450px] flex flex-col gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={name.length < 3 || name.length > 100}
            errorMessage="Between 3 and 100 characters"
            isRequired
          />
          <Input
            label="Image URL (JPG)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            isInvalid={!isValidImageUrl(image)}
            errorMessage="Must be a valid JPG URL"
            isRequired
          />
          {isValidImageUrl(image) && (
            <Image
              src={image}
              alt="Image Preview"
              radius="md"
              className="w-[400px] h-auto max-h-[300px] object-cover rounded-lg"
            />
          )}
          <Input
            label="Number of Likes"
            value={String(meme.likes)}
            isReadOnly
            errorMessage="Between 0 and 99"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
