import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'memes.json')

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    const file = await fs.readFile(dbPath, 'utf-8')
    const data = JSON.parse(file)

    const memeIndex = data.findIndex((m: any) => m.id === id)
    if (memeIndex === -1)
      return NextResponse.json({ error: 'Meme not found' }, { status: 404 })

    data.splice(memeIndex, 1)

    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ message: 'Meme deleted successfully' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error deleting meme' }, { status: 500 })
  }
}
